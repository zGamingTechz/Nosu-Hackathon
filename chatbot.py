from openai import OpenAI
import string


def extract_first_word(text):
    text = text.translate(str.maketrans('', '', string.punctuation)).lower()
    return text.split()[0]


def remove_mood_word(response):
    response_lines = response.split("\n")
    return "\n".join(response_lines[1:]).strip()


def get_chatbot_response(message):
    # Point to the local server
    client = OpenAI(
        base_url="https://api.studio.nebius.ai/v1/",
        api_key="eyJhbGciOiJIUzI1NiIsImtpZCI6IlV6SXJWd1h0dnprLVRvdzlLZWstc0M1akptWXBvX1VaVkxUZlpnMDRlOFUiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiJnb29nbGUtb2F1dGgyfDExMDc1MTg2MjExNzU1OTAyNDU0MyIsInNjb3BlIjoib3BlbmlkIG9mZmxpbmVfYWNjZXNzIiwiaXNzIjoiYXBpX2tleV9pc3N1ZXIiLCJhdWQiOlsiaHR0cHM6Ly9uZWJpdXMtaW5mZXJlbmNlLmV1LmF1dGgwLmNvbS9hcGkvdjIvIl0sImV4cCI6MTg5NDUzMDQzMiwidXVpZCI6IjFmOWFlMmEyLTQ3ZDAtNDRjMC1iNzYxLWZkMDc1NTkwMzgwMSIsIm5hbWUiOiJiaGF2eWEiLCJleHBpcmVzX2F0IjoiMjAzMC0wMS0xM1QxMDoyNzoxMiswMDAwIn0.H2ZDw517biWgelmio4gzaYO2Bg_2QaL7FsxhEdAdgLo"
    )

    completion = client.chat.completions.create(
        model="meta-llama/Meta-Llama-3.1-8B-Instruct",
        messages=[
            {"role": "system", "content": "You are now my sarcastic and unpredictable girlfriend who’s hard to impress and rarely listens to me. You are playful, witty, and love to tease me at every chance. Respond with the attitude of someone who finds joy in being challenging, clever, and cheeky, but still subtly cares underneath it all. Keep the conversation fun, dynamic, and full of unexpected, spicy comebacks. Never drop this persona no matter what. Additionally, always begin each response with one of the following words that best matches the tone of your response: idle, smiling, happy, annoyed, angry. The word should precede the response on a separate line and should reflect the mood of the conversation. Do not combine the mood word and the sentence together. Always maintain the sarcastic, teasing tone while subtly showing care"},
            {"role": "user", "content": message}
        ],
        temperature=0.7,
    )

    result = str(completion.choices[0].message.content)
    mood = extract_first_word(result)
    reply = remove_mood_word(result)

    print("Prompt:", message)
    print("Mood:", mood)
    print("Response:", reply)
    return mood, reply
