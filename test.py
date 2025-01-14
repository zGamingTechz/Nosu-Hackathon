import string


def extract_first_word(text):
    text = text.translate(str.maketrans('', '', string.punctuation)).lower()
    return text.split()[0]


# Example usage
response = "Annoyed, hello...."
first_word = extract_first_word(response)
print("First word:", first_word)