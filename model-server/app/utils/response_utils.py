import openai

# from firebase_config import db

# Set your OpenAI API key  ### isini
openai.api_key = ""


# Function to generate response using LLM (GPT-3/4)
def generate_response_from_llm(emotion, patient_history=None):
    prompt = f"The patient is feeling {emotion}. Based on the patient's emotional history and preferences, provide personalized instructions for the caregiver. The patient's history: {patient_history if patient_history else 'No previous data available.'}"

    try:
        # Make a call to the OpenAI API
        response = openai.Completion.create(
            model="gpt-3.5-turbo",  # You can replace with gpt-3.5-turbo, etc.
            prompt=prompt,
            max_tokens=100,
            temperature=0.7,
        )

        # Get the LLM response
        llm_response = response.choices[0].text.strip()
        return llm_response

    except Exception as e:
        return f"Error generating response: {str(e)}"


# Function to save the response to Firestore (Firebase)
def save_response(emotion, response):
    print(f"Emotion: {emotion}, Response: {response}")
    # db.collection('responses').add({
    #     'emotion': emotion,
    #     'response': response
    # })
