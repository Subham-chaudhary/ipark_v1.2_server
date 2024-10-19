from contextlib import asynccontextmanager
from typing import Any

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from pydantic import BaseModel
from gmqtt import Client as MQTTClient

from fastapi_mqtt import FastMQTT, MQTTConfig
import json

mqtt_config = MQTTConfig(
    host="broker.hivemq.com",
    port=1883,
    keepalive=60,
    username="",
    password="",
)
fast_mqtt = FastMQTT(config=mqtt_config)

# Global variable to store the latest message for each topic
latest_messages = {
    # "parkingLot/v1": {"topic": "", "payload": "", "qos": 0, "properties": {}},
    # "parkingLot/v2": {"topic": "", "payload": "", "qos": 0, "properties": {}},
    # "parkingLot/v3": {"topic": "", "payload": "", "qos": 0, "properties": {}},
    "parkingLot/#": {"topic": "", "payload": "", "qos": 0, "properties": {}},
    "parq/book/#": {"topic": "", "payload": "", "qos": 0, "properties": {}}
}

# A list to store active WebSocket connections
active_connections = []

@asynccontextmanager
async def _lifespan(_app: FastAPI):
    await fast_mqtt.mqtt_startup()
    print("MQTT startup complete")
    yield
    await fast_mqtt.mqtt_shutdown()
    print("MQTT shutdown complete")


app = FastAPI(lifespan=_lifespan)


@fast_mqtt.on_connect()
def connect(client: MQTTClient, flags: int, rc: int, properties: Any):
    # Subscribe to all three topics
    # client.subscribe("parkingLot/v1")
    # client.subscribe("parkingLot/v2")
    # client.subscribe("parkingLot/v3")

    # wild card entry
    client.subscribe("parkingLot/#")
    print("Connected and subscribed to topics: parkingLot/v1, parkingLot/v2, parkingLot/v3")


# Define a function to handle messages from any of the topics
@fast_mqtt.on_message()
async def message(client: MQTTClient, topic: str, payload: bytes, qos: int, properties: Any):
    global latest_messages

    # Decode the payload and store the latest message for each topic
    latest_messages[topic] = {
        "topic": topic,
        "payload": payload.decode(),
        "qos": qos,
        "properties": properties,
    }

    # Print the received message in the terminal
    print(f"Received message on {topic}: {payload.decode()} (QoS: {qos}, Properties: {properties})")

    # Broadcast the message to all connected WebSocket clients
    await broadcast_to_websockets(topic, payload.decode())


# WebSocket manager to handle active connections
class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_message(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)


manager = ConnectionManager()


async def broadcast_to_websockets(topic: str, payload: str):
    message = json.dumps({
        "topic": topic,
        "payload": payload
    })
    await manager.send_message(message)


# WebSocket endpoint to connect the client
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            # Keep the connection alive (ping/pong mechanism)
            await websocket.receive_text()  # This could be used to receive messages if needed
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        print("WebSocket disconnected")


@fast_mqtt.on_disconnect()
def disconnect(client: MQTTClient, packet, exc=None):
    print("Disconnected from MQTT broker")


@fast_mqtt.on_subscribe()
def subscribe(client: MQTTClient, mid: int, qos: int, properties: Any):
    print(f"Subscribed to topic with mid: {mid}, QoS: {qos}, Properties: {properties}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
