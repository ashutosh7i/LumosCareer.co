import re
import os

def lowercase_jsx_text(file_path):
    # Read the content of the JSX file
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    # Regular expression to find text within JSX tags
    pattern = re.compile(r'>([^<]+)<')

    # Function to convert matched text to lowercase
    def to_lowercase(match):
        return f'>{match.group(1).lower()}<'

    # Replace all occurrences of the pattern with lowercase text
    modified_content = re.sub(pattern, to_lowercase, content)

    # Write the modified content back to the file
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(modified_content)

# Get the directory of the current script
script_dir = os.path.dirname(os.path.realpath(__file__))

# Construct the path to temp.jsx relative to the script directory
jsx_file_path = os.path.join(script_dir, 'temp.jsx')

# Call the function with the correct path
lowercase_jsx_text(jsx_file_path)