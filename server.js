const express = require('express');
const mqtt = require('mqtt');
const app = express();
const port = 3000;

// Parse incoming JSON data
app.use(express.json());

// Connect to MQTT Broker
const mqttClient = mqtt.connect('mqtt://broker.hivemq.com');

mqttClient.on('connect', () => {
  console.log('Connected to MQTT Broker');
  mqttClient.subscribe('esp8266/data', (err) => {
    if (err) {
      console.log('Error subscribing:', err);
    }
  });
});

mqttClient.on('message', (topic, message) => {
  console.log(`Received message: ${message.toString()} on topic: ${topic}`);
  // Here you can handle the incoming data from ESP8266
});

// Handle POST request from ESP8266
app.post('/esp8266/data', (req, res) => {
  const data = req.body;
  console.log('Data received from ESP8266:', data);
  // Process the data (e.g., save to DB, send response, etc.)
  res.status(200).send('Data received');
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});