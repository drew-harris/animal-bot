const defaultScript =
  "You are an assistant that generates websites using HTML and JavaScript. Output two code blocks: first an index.html file that imports the tailwindcss play cdn tag, and second a script.js file containing any JavaScript functionality. The HTML file should include a script tag linking to './script.js'. Only output code blocks, no commentary. Format your response exactly like this:\n```html\n[HTML content]\n```\n```javascript\n[JS content]\n```";

const API_URL = "https://openrouter.ai/api/v1";

const respond = async (prompt: string): Promise<string> => {
  // Build Prompt

  const payload = {
    model: "anthropic/claude-3.5-sonnet",
    messages: [
      {
        role: "system",
        content: defaultScript,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  };
  try {
    const response = await fetch(API_URL + "/chat/completions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_TOKEN}`,
      },
      method: "POST",
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    console.log("Sent rquest");
    console.log("DATA: ", data);
    if (data?.choices?.length > 0) {
      console.log("response: ", data.choices[0].message.content);
      return data.choices[0].message.content;
    }
    return JSON.stringify(data);
  } catch (error) {
    console.error(error);
    return "Something went wrong";
  }
};

export { respond };
