const apiKey = "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"

const translate = document.getElementById("translate");
const debug = document.getElementById("debug"); // Add debug button
const qualityCheck = document.getElementById("qualityCheck"); // Add quality check button

const input = document.getElementById("chat-input");
const message = document.getElementById("chat-message");

let input_language = "JavaScript";
let output_language = "Python";

document.getElementById("select_input_language").addEventListener("change", function () {
    input_language = this.value;
});

document.getElementById("select_output_language").addEventListener("change", function () {
    output_language = this.value;
});

translate.addEventListener("click", async (e) => {
    message.innerText = "...loading";
    const jsCode = input.value;
    try {
        const res = await axios.post("https://api.openai.com/v1/completions", {
            prompt: `You are a coding translator! Your task is to translate ${input_language} code to ${output_language} code. Your work is to give only the code; you don't have to tell anything about the code, just change it from ${input_language} to ${output_language}. There is no need for printing extra. Here is ${input_language} code you need to translate: ${jsCode}`,
            model: "text-davinci-003",
            temperature: 0,
            max_tokens: 50,
            top_p: 1,
            frequency_penalty: 0.0,
            presence_penalty: 0.0
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`
            }
        });

        const translatedCode = res.data.choices[0].text;
        message.innerHTML = `${translatedCode}`;
        console.log(message.innerHTML);
    } catch (err) {
        console.log(err.message);
    }
});

// Add Debug functionality
debug.addEventListener("click", async() => {
    // Your debug code goes here
    message.innerText = "Debugging...";
    // Add your debugging logic
    const jsCode = input.value;
    try {
        const res = await axios.post("https://api.openai.com/v1/completions", {
            prompt: `You are going to debug this code and tell me what changes we can make in our code you are going to tell me in list and give me the updated code at last  Here is the code you need to translate: ${jsCode}`,
            model: "text-davinci-003",
            temperature: 0,
            max_tokens: 100,
            top_p: 1,
            frequency_penalty: 0.0,
            presence_penalty: 0.0
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`
            }
        });

        const translatedCode = res.data.choices[0].text;
        message.innerHTML = `${translatedCode}`;
        console.log(message.innerHTML);
    } catch (err) {
        console.log(err.message);
    }
});

// Add Quality Check functionality
qualityCheck.addEventListener("click",async() => {
    // Your quality check code goes here
    message.innerText = "Quality Checking...";
    // Add your quality checking logic
    const jsCode = input.value;
    try {
        const res = await axios.post("https://api.openai.com/v1/completions", {
            prompt: `You are going to do quality check of the code and tell me what changes we can make in our code you are going to tell me in list and give me the updated code at last  Here is the code you need to translate: ${jsCode}`,
            model: "text-davinci-003",
            temperature: 0,
            max_tokens: 100,
            top_p: 1,
            frequency_penalty: 0.0,
            presence_penalty: 0.0
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`
            }
        });

        const translatedCode = res.data.choices[0].text;
        message.innerHTML = `${translatedCode}`;
        console.log(message.innerHTML);
    } catch (err) {
        console.log(err.message);
    }
});
