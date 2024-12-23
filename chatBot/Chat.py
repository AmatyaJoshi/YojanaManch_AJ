import streamlit as st
from dotenv import load_dotenv
from langchain_core.prompts import ChatPromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.output_parsers import StrOutputParser
import pandas as pd
import re

hide_streamlit_style = """
    <style>
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    .stAlert {visibility: hidden;}
        .stTextInput input::placeholder {
        color: #2986cc; 
    }

    </style>
"""
st.markdown(hide_streamlit_style, unsafe_allow_html=True)

load_dotenv()

try:
    data = pd.read_csv('yojana_faq.csv')
    if data.columns[0].lower() != 'prompt':
        data.columns = ['Prompt', 'Response']
    
    prompt_response_dict = dict(zip(data['Prompt'].str.strip(), data['Response'].str.strip()))
except FileNotFoundError:
    st.error("CSV file not found. Please check the file path and try again.")
    st.stop()
except pd.errors.EmptyDataError:
    st.error("CSV file is empty or improperly formatted.")
    st.stop()

def get_response(user_input):
    # Check for greetings
    greetings = ["hi", "hello", "hey", "good morning", "good afternoon", "good evening"]
    if any(greeting in user_input.lower() for greeting in greetings):
        return "Hello! How can I assist you today?"
    
    # Check for responses in the dataset
    return prompt_response_dict.get(user_input, None)

llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-pro",
    temperature=0,
    max_tokens=None,
    timeout=None,
    max_retries=2,
)

template_text = """
You are an expert Customer Service Associate of Yojana Manch. Below are some examples of questions and their appropriate answers:

{examples}

Now, answer the following question in the context of the provided information:

Question: {question}
"""

examples = "\n".join([f"Q: {q}\nA: {a}" for q, a in prompt_response_dict.items()])

st.title('Yojana Manch Customer Support')

if "messages" not in st.session_state:
    st.session_state.messages = []

for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

input_text = st.chat_input("Enter your question here")
if input_text:
    st.session_state.messages.append({"role": "user", "content": input_text})

    with st.chat_message("user"):
        st.markdown(input_text)

    dataset_response = get_response(input_text)

    if dataset_response:
        response = dataset_response
    else:
        prompt_text = template_text.format(examples=examples, question=input_text)
        output_parser = StrOutputParser()
        prompt_messages = [
            ("system", "You are an expert Customer Service Associate hired by Yojana Manch. Please use the following examples to help answer the user's question."),
            ("user", prompt_text)
        ]
        prompt_template = ChatPromptTemplate.from_messages(prompt_messages)
        chain = prompt_template | llm | output_parser
        
        try:
            response = chain.invoke({"question": input_text})
        except Exception as e:
            response = "Our server is currently down. Please try again later."

    st.session_state.messages.append({"role": "assistant", "content": response})

    with st.chat_message("assistant"):
        st.markdown(response)
