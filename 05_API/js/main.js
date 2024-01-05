// alert('aaa');
const API_KEY = KEY;
const URL = "https://api.openai.com/v1/chat/completions";

//関数外で使うのでグローバル領域で定義
var script = null; 

$('#genScript').on('click', function() {
    async function getResponse() {
        console.log("generating...")
        try {
            const response = await axios.post(
                URL,
                {
                    model: "gpt-4",
                    messages: [
                        {
                          "role": "system",
                          "content": "As a content writer experienced in teaching Japanese students and knowledgeable about their English proficiency levels, create a script of about 200 words. This script should be suitable for Part 2 of the Listening section of the Eiken Test, Grade 1, a widely recognized English proficiency test in Japan. After the script, include two related questions. The script's subject matter should cover areas like science, nature, society, history, and politics, incorporating vocabulary appropriate for Eiken Test Grade 1. Title the script succinctly, using no more than four words. Present the content in a clear, direct manner, without an opening greeting or a lecture-style format. \n\n\n\n\n\n"
                        },
                        {
                          "role": "user",
                          "content": "Please generate the instructed content in system.  The output should be in JSON format."
                        },
                        {
                          "role": "assistant",
                          "content": "{\n  \"Passage\": \"Sleep and Dementia\\nResearchers in France have been studying possible causes of dementia, a condition in which a person experiences a severe loss of cognitive function. They investigated whether the amount of sleep a person gets in middle age plays a role in the development of the condition. Using self-reported sleep data from a large-scale lifestyle survey, the researchers looked at 8,000 participants who had been research subjects since 1985. The team found that, compared to participants who reported sleeping seven hours per night in their 50s and 60s, those who regularly got six hours of sleep or less per night were 30% more likely to develop dementia in later decades. While this finding suggests that insufficient sleep could be a contributing factor in the development of dementia, it is not conclusive. It could be that lack of sleep in middle age is actually an early symptom of dementia, rather than a cause. However, a neurologist who commented on the study thinks this is probably not the case, as the poor sleeping habits arose such a long time before any of the subjects were diagnosed with dementia. Additionally, she points out that the first biological change that leads to dementia — the buildup of certain proteins in the brain — typically does not begin that early on\",\n  \"Questions\": {\n    \"1\": \"What is one thing the researchers in France examined?\",\n    \"2\": \"What does the neurologist believe?\"\n  },\n  \"Choices\": {\n    \"Question 1\": [\n      \"1 Evidence that Shows people with dementia sleep more.\",\n      \"2 Various sleep disorders reported by young people.\",\n      \"3 Lifestyle changes as a treatment for dementia.\",\n      \"4 The sleep patterns of middle-aged people.\"\n    ],\n    \"Question 2\": [\n      \"1 Protein buildup is not always a sign of dementia.\",\n      \"2 Participants' sleep patterns were likely not caused by dementia.\",\n      \"3 Better treatments for dementia will soon be developed.\",\n      \"4 Middle-aged people generally have difficulty sleeping.\"\n    ]\n  },\n  \"Answers\": {\n    \"1\": \"4\",\n    \"2\": \"2\"\n  }\n}\n"
                        },
                        {
                          "role": "assistant",
                          "content": "{\n  \"Passage\": \"American Camels\\nToday, camels are an iconic symbol of the Middle East and North Africa. Surprisingly, however, evidence indicates that they originated in North America. Fossils suggest that the last indigenous camels in North America died out many thousands of years ago. Then, in the mid-1800s, the US government imported several dozen camels to deliver military supplies to remote areas. It was thought that the animals would be well-suited to the harsh desert climate of the southwestern United States. Indeed, initial field exercises were so successful that a high-ranking official suggested acquiring an additional thousand camels. When the American Civil War broke out shortly after the camels had been put to work, however, the plan was abandoned. Some of the camels that had been brought over were sold to private businesses such as circuses and mining operations for their value as entertainment and labor, but a few were released and continued living in the desert. Although there were several wild-camel sightings over the following decades, their numbers were too few to create a stable population, and it is thought they disappeared completely. Now, over 100 years later, some scientists are considering reintroducing camels a second time.\",\n  \"Questions\": {\n    \"1\": \"Why did the US government import camels in the mid-1800s?\",\n    \"2\": \"What do we learn about the camels that were released into the wild?\"\n  },\n  \"Choices\": {\n    \"Question 1\": [\n      \"1 To supply goods to isolated regions.\",\n      \"2 To improve relationships with foreign countries.\",\n      \"3 To restore the ecology of desert areas.\",\n      \"4 To give them as gifts to senior military officers.\"\n    ],\n    \"Question 2\": [\n      \"1 They were captured to be sold to circuses.\",\n      \"2 They eventually spread across the desert.\",\n      \"3 Their population was too small to sustain itself.\",\n      \"4 They continued to be sighted for nearly 100 years.\"\n    ]\n  },\n  \"Answers\": {\n    \"1\": \"1\",\n    \"2\": \"3\"\n  }\n}\n"
                        }
                      ],
                    temperature: 1,
                    max_tokens: 600,
                    top_p: 0.8,
                    frequency_penalty: 0.5,
                    presence_penalty: 2,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${API_KEY}`,
                    },
                }
            );
            script = response.data.choices[0].message.content;
            // displayScriptContent(JSON.parse(script));
            $("#Response_text").val(script);
            console.log(script)
        } catch(error) {
            console.log(error);
        }
    }
    getResponse();
});

