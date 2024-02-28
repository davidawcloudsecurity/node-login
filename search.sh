#!/bin/bash

# Check if the correct number of arguments are provided
if [ $# -ne 2 ]; then
    echo "Usage: $0 <directory_path> <search_string>"
    exit 1
fi

# Assign arguments to variables
directory="$1"
search_string="$2"

# Check if the directory exists
if [ ! -d "$directory" ]; then
    echo "Error: Directory '$directory' not found."
    exit 1
fi

# Perform recursive search using grep
grep_output=$(grep -rn "$search_string" "$directory")

# Check if grep found any matches
if [ -z "$grep_output" ]; then
    echo "No matches found for '$search_string' in '$directory' and its subdirectories."
else
    echo "Matches found for '$search_string' in '$directory' and its subdirectories:"
    echo "$grep_output"
fi

exit 0
