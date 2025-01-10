import time
import os
from openai import OpenAI
from flask import Flask, request, jsonify
from flask_cors import CORS

ASSISTANT_ID = "ASSISTANT KEY"
os.environ["OPENAI_API_KEY"] = "API KEY" 

client = OpenAI()

def submit():
    data = "Hello, solve this equation x+y=1, x<1, x is not decimal"
    #data = request.get_json() 
    # Use 'data' in your OpenAI logic (call your main.py functions)
    print(f"Received data: {data}")
    prompt = str(data)
    
    print("Creating thread...")
    # Create a thread with a message.
    thread = client.beta.threads.create(
        messages=[
            {
            "role": "user",
            "content": prompt,
            }
        ]
    )

    # Submit the thread to the assistant (as a new run).
    run = client.beta.threads.runs.create_and_poll(thread_id=thread.id, assistant_id=ASSISTANT_ID)
    print(f"👉 Run Created: {run.id}")

    # Wait for run to complete.
    while run.status != "completed":
        run = client.beta.threads.runs.retrieve(thread_id=thread.id, run_id=run.id)
        print(f"🏃 Run Status: {run.status}")
        time.sleep(5)
    else:
        print(f"🏁 Run Completed!")

    # Get the latest message from the thread.
    message_response = client.beta.threads.messages.list(thread_id=thread.id)
    messages = message_response.data

    # Print the latest message.
    latest_message = messages[0]
    response_content = latest_message.content[0].text.value
    print(f"💬 Response: {response_content}")

    
    return jsonify({"response": response_content})