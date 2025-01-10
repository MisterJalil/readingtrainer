from openai import OpenAI
import os

os.environ["OPENAI_API_KEY"] = "API KEY"
client = OpenAI()


content = input("Thumbnail description: \n")
response = client.images.generate(
    model="dall-e-3",
    prompt=content,
    size="1024x1024",
    quality="standard",
    n=1,
)


image_url = response.data[0].url


print(image_url)
