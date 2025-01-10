import time
import os
from openai import OpenAI
from flask import Flask, request, jsonify

# Enter your Assistant ID here.
ASSISTANT_ID = "ASSISTANT KEY"
os.environ["OPENAI_API_KEY"] = "API KEY"

#  Make sure your API key is set as an environment variable.
client = OpenAI()


def get_openai_response(prompt):
    # Create a thread with a message.
    thread = client.beta.threads.create(
        messages=[
            {
                "role": "user",
                # Update this with the query you want to use.
                "content": prompt,
            }
        ]
    )

    # Submit the thread to the assistant (as a new run).
    run = client.beta.threads.runs.create_and_poll(
  thread_id=thread.id,
  assistant_id=ASSISTANT_ID
)
    print(f"👉 Run Created: {run.id}")

    # Wait for run to complete.
    while run.status != "completed":
        run = client.beta.threads.runs.retrieve(thread_id=thread.id, run_id=run.id)
        print(f"🏃 Run Status: {run.status}")
        time.sleep(1)
    else:
        print(f"🏁 Run Completed!")

    # Get the latest message from the thread.
    message_response = client.beta.threads.messages.list(thread_id=thread.id)
    messages = message_response.data

    # Print the latest message.
    latest_message = messages[0]
    response_content = latest_message.content[0].text.value
    print(f"💬 Response: {response_content}")

