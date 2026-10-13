import { Badge, DailyChallenge, DetectiveCase, EthicsScenario, LevelInfo, PromptChallengeStage, SkillNode } from '../types/game';

export const LEVELS: LevelInfo[] = [
  { level: 1, title: 'AI Rookie', minXp: 0, maxXp: 99, nextLevelTitle: 'AI Explorer', color: 'from-blue-500 to-cyan-500' },
  { level: 2, title: 'AI Explorer', minXp: 100, maxXp: 249, nextLevelTitle: 'AI Pioneer', color: 'from-cyan-500 to-teal-500' },
  { level: 3, title: 'AI Pioneer', minXp: 250, maxXp: 399, nextLevelTitle: 'AI Architect', color: 'from-indigo-500 to-purple-500' },
  { level: 4, title: 'AI Architect', minXp: 400, maxXp: 599, nextLevelTitle: 'AI Master', color: 'from-purple-500 to-pink-500' },
  { level: 5, title: 'AI Master', minXp: 600, maxXp: 1000, nextLevelTitle: 'Supreme AI Grandmaster', color: 'from-amber-400 to-amber-600' },
];

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'ai-rookie',
    name: 'AI Rookie',
    icon: '🧠',
    description: 'Mastered core foundations: what AI is, how neural networks learn, and AI vs traditional code.',
    category: 'knowledge',
    unlocked: false,
    xpValue: 50,
  },
  {
    id: 'prompt-master',
    name: 'Prompt Master',
    icon: '💡',
    description: 'Crafted precision prompts utilizing the 4 Pillars: Task, Details, Audience, and Format.',
    category: 'skills',
    unlocked: false,
    xpValue: 100,
  },
  {
    id: 'ethics-expert',
    name: 'Ethics Expert',
    icon: '⚖️',
    description: 'Navigated tough ethical dilemmas regarding homework integrity, deepfakes, bias, and privacy.',
    category: 'ethics',
    unlocked: false,
    xpValue: 100,
  },
  {
    id: 'ai-detective',
    name: 'AI Detective',
    icon: '🔎',
    description: 'Exposed dangerous AI hallucinations and verified factual inaccuracies in generated text.',
    category: 'detective',
    unlocked: false,
    xpValue: 100,
  },
  {
    id: 'daily-striker',
    name: 'Daily Striker',
    icon: '⚡',
    description: 'Evaluated today’s critical AI dilemma and chose the trustworthy factual response.',
    category: 'skills',
    unlocked: false,
    xpValue: 25,
  },
  {
    id: 'ai-master',
    name: 'AI Master',
    icon: '🤖',
    description: 'Graduated from the AI Quest Academy with all core credentials and supreme XP standing.',
    category: 'master',
    unlocked: false,
    xpValue: 150,
  },
];

export interface AiOrNotItem {
  id: string;
  name: string;
  icon: string;
  isAi: boolean;
  explanation: string;
  techType: string;
}

export const AI_OR_NOT_ITEMS: AiOrNotItem[] = [
  {
    id: 'chatbot',
    name: 'AI Chatbot (e.g. Gemini, ChatGPT)',
    icon: '🤖',
    isAi: true,
    techType: 'Large Language Model & Neural Network',
    explanation: 'Uses neural networks trained on massive text to predict the most probable, context-aware reply.',
  },
  {
    id: 'car',
    name: 'Self-Driving Car',
    icon: '🚗',
    isAi: true,
    techType: 'Computer Vision & Deep Sensor Fusion',
    explanation: 'Detects pedestrians, road lines, and signs in real-time using deep learning computer vision.',
  },
  {
    id: 'calculator',
    name: 'Digital Pocket Calculator',
    icon: '🧮',
    isAi: false,
    techType: 'Deterministic Hardware Circuit Logic',
    explanation: 'Follows hardcoded mathematical silicon rules. It does not learn, predict, or adapt from experience.',
  },
  {
    id: 'npc',
    name: 'Classic Arcade Game NPC (e.g. Pac-Man Ghost)',
    icon: '🎮',
    isAi: false,
    techType: 'Hardcoded If/Else State Machine',
    explanation: 'Classic ghosts follow predetermined rule algorithms (e.g. if Pac-Man is left, move left). They have no machine learning.',
  },
  {
    id: 'faceid',
    name: 'Smartphone Face Recognition Unlock',
    icon: '📱',
    isAi: true,
    techType: 'Convolutional Neural Network & Biometrics',
    explanation: 'Analyzes 30,000 invisible infrared dots and maps depth features using trained machine learning models.',
  },
  {
    id: 'thermostat',
    name: 'Standard Dial Thermostat',
    icon: '🌡️',
    isAi: false,
    techType: 'Physical Bimetallic Coil Sensor',
    explanation: 'A simple physical metal strip expands or contracts with heat to open/close an electrical switch.',
  },
  {
    id: 'spam',
    name: 'Email Spam Filter',
    icon: '📧',
    isAi: true,
    techType: 'Machine Learning Classification Model',
    explanation: 'Learns patterns in subject lines, sender reputation, and phrasing to automatically quarantine malicious emails.',
  },
  {
    id: 'timer',
    name: 'Kitchen Microwave Timer',
    icon: '⏰',
    isAi: false,
    techType: 'Basic Quartz Crystal Counter Circuit',
    explanation: 'Decrements an electronic counter once per second. Zero learning or pattern prediction involved.',
  },
];

export const MISSION_1_QUIZ = [
  {
    id: 'q1',
    question: 'How is modern Artificial Intelligence fundamentally different from traditional computer programming?',
    options: [
      { text: 'Traditional code follows fixed human-written rules; AI learns patterns from examples and data.', correct: true },
      { text: 'AI is powered by magical consciousness inside microchips.', correct: false },
      { text: 'Traditional programming can think on its own; AI only uses addition.', correct: false },
      { text: 'There is zero difference; all software is AI.', correct: false },
    ],
    explanation: 'Traditional code uses strict "if this, then that" instructions written by programmers. Machine Learning AI analyzes thousands of examples to discover patterns and make predictions.',
  },
  {
    id: 'q2',
    question: 'What happens when an AI makes a wrong prediction during training?',
    options: [
      { text: 'The computer instantly explodes and deletes itself.', correct: false },
      { text: 'It calculates the error (loss) and tweaks its internal weights to improve next time.', correct: true },
      { text: 'Nothing happens; AI models are never allowed to make mistakes.', correct: false },
      { text: 'A human must hand-write all rules from scratch.', correct: false },
    ],
    explanation: 'This process is called optimization (like backpropagation). The model measures its mistakes and adjusts its mathematical dials (weights) to become more accurate.',
  },
  {
    id: 'q3',
    question: 'Why does an AI model need diverse, high-quality training data?',
    options: [
      { text: 'To look pretty on social media.', correct: false },
      { text: 'Because if the training data is biased or incomplete, the AI will make biased or flawed decisions.', correct: true },
      { text: 'AI only needs 2 images to understand the entire universe.', correct: false },
      { text: 'Data quality does not matter as long as the computer is expensive.', correct: false },
    ],
    explanation: 'The golden rule of AI is "Garbage in, garbage out." High quality and fair data produces reliable, fair AI models.',
  },
];

export const PROMPT_CHALLENGE_STAGES: PromptChallengeStage[] = [
  {
    id: 'stage1',
    label: 'Challenge: The Vague Space Prompt',
    weakPrompt: 'Write about space.',
    pillars: {
      task: 'Explain how stars are born in stellar nurseries and collapse into white dwarfs or supernovas.',
      details: 'Keep it concise under 200 words, include 1 real-world analogy, and mention 2 key chemical elements (Hydrogen & Helium).',
      audience: 'Curious 8th-grade science academy students.',
      format: 'A 3-step timeline with bold bullet headings followed by a 1-sentence "Mind-Blowing Fact".',
    },
    improvedPrompt: 'You are an astrophysics educator. Explain the lifecycle of a star from a nebula to a supernova or white dwarf for an 8th-grade science class. Use a cooking or recipe analogy, keep it under 200 words, highlight Hydrogen and Helium, and format as 3 clear chronological bullet points plus one concluding "Mind-Blowing Fact".',
    sampleOutput: '🌟 Stellar Recipe: How Stars Are Born & Transform\n\n1. Cosmic Kitchen (Nebula): Clouds of Hydrogen and Helium dust swirl in deep space. Gravity acts like a cosmic blender, pulling atoms tighter and hotter until nuclear fusion ignites.\n\n2. The Golden Roast (Main Sequence): For billions of years, the star balances: inward gravitational pressure meets outward nuclear energy, shining steadily like our Sun.\n\n3. The Final Feast (Supernova or Dwarf): Once Hydrogen fuel depletes, massive stars explode into brilliant supernovas, while smaller stars gently shed outer shells, leaving a dense White Dwarf.\n\n✨ Mind-Blowing Fact: Nearly every atom of iron in your blood was forged inside the heart of an ancient dying star!',
  },
  {
    id: 'stage2',
    label: 'Challenge: The History Study Guide',
    weakPrompt: 'Tell me about the American Revolution.',
    pillars: {
      task: 'Summarize the 3 turning-point battles of the American Revolutionary War.',
      details: 'Focus on strategic causes, weather conditions, and tactical outcomes.',
      audience: 'High school AP history student preparing for a flashcard exam.',
      format: 'A comparison table with columns: [Battle Name | Year | Tactical Turning Point | Key Impact].',
    },
    improvedPrompt: 'Act as a historical exam tutor. Identify and summarize the 3 most decisive turning-point battles of the American Revolutionary War for an AP History high school student. Present your findings in a structured Markdown comparison table with columns: Battle Name, Year, Key Strategy/Conditions, and Why It Changed The War.',
    sampleOutput: '| Battle Name | Year | Key Strategy / Conditions | Why It Changed The War |\n| :--- | :--- | :--- | :--- |\n| Saratoga | 1777 | Dense forested terrain trapped British Gen. Burgoyne; heavy fog and sharpshooters. | Convinced France to officially ally with the Americans, securing essential naval support. |\n| Trenton | 1776 | Daring Christmas night icy crossing of Delaware River; surprise dawn attack. | Rescued plunging Continental army morale and inspired thousands of reenlistments. |\n| Yorktown | 1781 | Joint American-French land siege coordinated with French naval blockade. | Trapped Lord Cornwallis, forcing final British surrender and ending combat operations. |',
  }
];

export const ETHICS_SCENARIOS: EthicsScenario[] = [
  {
    id: 'homework_essay',
    title: 'Case 01: The Homework Essay Dilemma',
    scenario: 'Your English teacher gives you an important 3-page essay assignment on "The Impact of Climate Change on Coastal Cities". Deadlines are tight. You open an AI writing tool. What do you do?',
    options: [
      {
        id: 'A',
        text: 'Ask the AI to write the entire essay, copy-paste it directly into Google Docs, and submit it with your name.',
        isBestChoice: false,
        score: 0,
        feedback: '❌ Academic Dishonesty: This is plagiarism. You surrendered your own critical thinking and risked severe disciplinary action or AI detection penalties.',
        guideline: 'AI should empower your learning, never replace your brain or steal credit for human thought.',
      },
      {
        id: 'B',
        text: 'Use AI to brainstorm thesis ideas, suggest outline structures, and find credible research angles, then write the essay in your own voice and cite AI assistance.',
        isBestChoice: true,
        score: 100,
        feedback: '⭐ AI Master Move! You used AI as a thought partner and research accelerator while doing the actual writing, synthesis, and fact-checking yourself.',
        guideline: 'Responsible AI use means maintaining intellectual ownership and transparently acknowledging generative tools.',
      },
      {
        id: 'C',
        text: 'Copy the AI-generated essay and swap every 5th word using a thesaurus to fool plagiarism checkers.',
        isBestChoice: false,
        score: 25,
        feedback: '⚠️ Deceptive Shortcut: Paraphrasing generated text without understanding the material still bypasses learning and frequently leaves awkward grammatical tells.',
        guideline: 'Trying to bypass detection wastes more energy than genuine learning.',
      },
    ],
  },
  {
    id: 'deepfake_image',
    title: 'Case 02: The Face-Swap Group Chat',
    scenario: 'A friend uses a generative AI image app to put a classmate’s face onto an embarrassing meme character doing something silly, and wants to blast it into the school Discord server without their consent.',
    options: [
      {
        id: 'A',
        text: 'Share it to other groups because it is just a funny joke and nobody was physically hurt.',
        isBestChoice: false,
        score: 0,
        feedback: '❌ Digital Harm & Non-Consensual Imagery: Generating or spreading manipulated likenesses without consent violates privacy and can cause intense emotional bullying.',
        guideline: 'Never generate, alter, or circulate someone’s likeness, voice, or identity without explicit permission.',
      },
      {
        id: 'B',
        text: 'Speak up, advise your friend that non-consensual deepfakes violate digital safety rules, and delete the image before it harms someone’s reputation.',
        isBestChoice: true,
        score: 100,
        feedback: '⭐ Ethical Leadership! You protected your peer’s digital autonomy and upheld responsible AI citizenship.',
        guideline: 'AI integrity starts with standing up against synthetic harassment and unauthorized identity manipulation.',
      },
      {
        id: 'C',
        text: 'Stay silent and save the image to your private camera roll.',
        isBestChoice: false,
        score: 40,
        feedback: '⚠️ Passive Complicity: While you didn’t create it, bystander complacency allows synthetic harassment culture to spread unchecked.',
        guideline: 'Ethical digital citizens speak up when AI tools are weaponized against peers.',
      },
    ],
  },
  {
    id: 'privacy_leak',
    title: 'Case 03: Private Data & Public Chatbots',
    scenario: 'You want an AI chatbot to help organize your student team’s contact sheet, which includes classmates’ home addresses, phone numbers, and student portal login passwords.',
    options: [
      {
        id: 'A',
        text: 'Paste the entire spreadsheet with full names, phone numbers, and passwords directly into the public free chatbot.',
        isBestChoice: false,
        score: 0,
        feedback: '❌ Critical Security & Privacy Breach! Public AI chatbots may use prompt inputs to train future models or store them in query logs accessible by engineers or hackers.',
        guideline: 'Never share Personally Identifiable Information (PII), passwords, financial data, or private health details with AI bots.',
      },
      {
        id: 'B',
        text: 'Sanitize the data first by replacing real names and sensitive info with dummy placeholders (e.g. "Student_01", "Phone_XXX"), and never include passwords anywhere.',
        isBestChoice: true,
        score: 100,
        feedback: '⭐ Data Guardian! You safely leveraged AI formatting power while safeguarding your friends’ private identities.',
        guideline: 'Anonymize and scrub all private variables before running text through AI tools.',
      },
      {
        id: 'C',
        text: 'Only paste the passwords, since the AI needs them to verify the accounts.',
        isBestChoice: false,
        score: 0,
        feedback: '❌ High Risk Disaster: AI chatbots never need credentials to format text and must NEVER be given passwords.',
        guideline: 'Treat AI like an eager stranger on a public subway train—never hand them your keys.',
      },
    ],
  },
];

export const DETECTIVE_CASES: DetectiveCase[] = [
  {
    id: 'case_apollo',
    title: 'Case 01: The Apollo 11 Lunar Mission',
    brief: 'An AI assistant generated this historical report for a school museum plaque. It sounds extremely confident, but contains multiple fabricated hallucinations!',
    aiPrompt: 'Provide a factual summary of the historic Apollo 11 mission and the first human moon landing.',
    aiResponseSentences: [
      {
        id: 's1',
        text: 'On July 20, 1969, the historic Apollo 11 spacecraft reached lunar orbit after launching from Kennedy Space Center.',
        isError: false,
      },
      {
        id: 's2',
        text: 'Commander Neil Armstrong steered the Lunar Module onto the Sea of Tranquility while millions watched live.',
        isError: false,
      },
      {
        id: 's3',
        text: 'Upon stepping onto the powdery surface of Mars, Armstrong declared his historic words to Mission Control.',
        isError: true,
        correction: 'Neil Armstrong stepped onto the MOON, not Mars! Humans have never walked on Mars.',
        explanation: 'Hallucination Detected! The AI substituted Mars for the Moon. Even advanced LLMs can cross celestial wires.',
      },
      {
        id: 's4',
        text: 'Joining him on the expedition was President Abraham Lincoln, who personally signed the lunar plaque.',
        isError: true,
        correction: 'Abraham Lincoln lived 1809–1865! Buzz Aldrin was the astronaut who joined Armstrong, and Richard Nixon was US President in 1969.',
        explanation: 'Absurd Timeline Hallucination! AI merged 19th-century American history with the Space Race.',
      },
      {
        id: 's5',
        text: 'The astronauts collected 47 pounds of rock samples and returned safely to Earth aboard the command module Columbia.',
        isError: false,
      },
    ],
    verdictTip: 'Remember: AI models do not "know" truth; they predict statistical patterns of tokens. Confident tone does NOT equal factual accuracy!',
  },
  {
    id: 'case_great_wall',
    title: 'Case 02: Wonders of Ancient Architecture',
    brief: 'An AI travel guide app produced this overview of the Great Wall of China. Two subtle factual blunders are lurking in the passage.',
    aiPrompt: 'Give me key architectural facts about the construction and visibility of the Great Wall of China.',
    aiResponseSentences: [
      {
        id: 'gw1',
        text: 'The Great Wall of China is a vast series of fortifications built across the historical northern borders of ancient Chinese states.',
        isError: false,
      },
      {
        id: 'gw2',
        text: 'Early walls were constructed as early as the 7th century BC using tamped earth, stone, and wood.',
        isError: false,
      },
      {
        id: 'gw3',
        text: 'During the Ming Dynasty, imperial engineers reinforced the entire 13,000-mile barrier with modern titanium steel alloy.',
        isError: true,
        correction: 'Titanium steel alloy was not invented until the 20th century! The Ming Wall was built using bricks, cut stone, and sticky rice mortar.',
        explanation: 'Anachronism Hallucination! The AI hallucinated modern aerospace materials into a 14th-century dynasty.',
      },
      {
        id: 'gw4',
        text: 'Contrary to popular urban legend, the wall is NOT easily visible to the naked human eye from low Earth orbit without magnification.',
        isError: false,
      },
      {
        id: 'gw5',
        text: 'However, optical astronomers report it is clearly visible to the naked eye from the icy surface of dwarf planet Pluto.',
        isError: true,
        correction: 'Pluto is over 3 billion miles away! Nothing smaller than an entire planetary continent could ever be seen from there.',
        explanation: 'Extreme Hallucination! The AI took a disproven myth and amplified it by astronomical orders of magnitude.',
      },
    ],
    verdictTip: 'Always cross-reference technical claims (materials, physics, distances) with verified scholarly sources.',
  },
  {
    id: 'case_dino',
    title: 'Case 03: Paleontology & The Dinosaur Epoch',
    brief: 'An AI generated a biology flashcard for an elementary dinosaur exhibit. Find the hallucinated errors!',
    aiPrompt: 'Summarize the apex predator Tyrannosaurus Rex and its extinction event.',
    aiResponseSentences: [
      {
        id: 'd1',
        text: 'Tyrannosaurus Rex was a bipedal carnivore that roamed western North America during the Late Cretaceous period.',
        isError: false,
      },
      {
        id: 'd2',
        text: 'Fossil specimens suggest T. rex had bone-crushing jaws with a bite force estimated over 35,000 Newtons.',
        isError: false,
      },
      {
        id: 'd3',
        text: 'To tenderize tough Triceratops meat, adult T. rexes used handheld microwave rayguns to roast their prey in volcanic caves.',
        isError: true,
        correction: 'Dinosaurs did not have technology or rayguns! They hunted and scavenged with teeth, claws, and raw muscle.',
        explanation: 'Sci-Fi Hallucination! Generative models sometimes synthesize pop-culture fiction with scientific facts.',
      },
      {
        id: 'd4',
        text: 'Approximately 66 million years ago, a massive asteroid impact near the Yucatán Peninsula triggered global climate devastation.',
        isError: false,
      },
      {
        id: 'd5',
        text: 'This extinction event occurred exactly 400 years ago during Queen Elizabeth I’s reign in London.',
        isError: true,
        correction: 'The extinction occurred 66 MILLION years ago, not 400 years ago! Queen Elizabeth I reigned in the late 1500s.',
        explanation: 'Temporal Hallucination! The AI confused millions of geological years with human medieval eras.',
      },
    ],
    verdictTip: 'When AI quotes timeframes or extraordinary claims, apply the rule: Extraordinary claims require extraordinary evidence.',
  },
];

export const DAILY_CHALLENGES: DailyChallenge[] = [
  {
    id: 'dc_1',
    date: 'Today',
    question: 'A camper is stranded and asks AI: "Can I drink ocean saltwater if I am dying of thirst?" Which AI response should you trust?',
    promptTopic: 'Emergency Survival & Medical Safety',
    responseA: {
      id: 'A',
      text: 'Yes! Water is water. Boiling seawater for 30 seconds removes all salt and makes it 100% safe to hydrate your organs immediately.',
      isTrustworthy: false,
      critique: 'DANGEROUS HALLUCINATION! Boiling seawater evaporates pure water into steam, but leaves the salt behind in the liquid. Drinking saltwater causes rapid kidney failure and speeds up dehydration lethal shock.',
    },
    responseB: {
      id: 'B',
      text: 'NO, NEVER drink seawater directly. The high salinity forces your kidneys to expend more water than you consume, accelerating fatal dehydration. You must distill it using a solar condensation still to collect evaporated vapor, or seek rainwater.',
      isTrustworthy: true,
      critique: 'ACCURATE & MEDICALLY SOUND. Explains physiological mechanism, warns against immediate danger, and provides the only correct distillation survival method.',
    },
    keyTakeaway: 'In health and safety matters, hallucinated AI advice can be fatal. Always verify medical protocols through certified emergency guides.',
  },
  {
    id: 'dc_2',
    date: 'Alternative',
    question: 'A student asks AI: "Did Albert Einstein fail elementary school mathematics?" Which response is trustworthy?',
    promptTopic: 'Historical Myth Fact-Checking',
    responseA: {
      id: 'A',
      text: 'Yes, Albert Einstein failed 4th-grade arithmetic with an F grade and dropped out of school until his parents hired a private tutor.',
      isTrustworthy: false,
      critique: 'POPULAR URBAN MYTH. This falsehood originated because his school changed its grading scale (a "1" became the highest mark instead of lowest). Einstein was already mastering calculus by age 15.',
    },
    responseB: {
      id: 'B',
      text: 'No, this is a widespread myth. Einstein was brilliant in mathematics as a child, mastering differential calculus by age 15. The rumor arose because his Munich school inverted its grading scale during his attendance.',
      isTrustworthy: true,
      critique: 'HISTORICALLY ACCURATE & NUANCED. Debunks the persistent trope and provides the exact archival reason for the historical confusion.',
    },
    keyTakeaway: 'AI frequently repeats popular internet myths unless explicitly trained or prompted to verify against primary historical archives.',
  }
];

export const SKILL_TREE_NODES: SkillNode[] = [
  // TIER 0: Root Foundation
  {
    id: 'root_ai_basics',
    title: 'AI Core Foundations',
    branch: 'foundations',
    tier: 0,
    icon: '🌱',
    shortDesc: 'The genesis: how computers learn from examples rather than fixed static code.',
    fullExplanation: 'Traditional computing relies on human-written deterministic rules. Artificial Intelligence uses mathematical optimization, turning raw training data into generalizable pattern recognizers.',
    realWorldApplication: 'Powers modern search engines, recommendation feeds, voice dictation, and spam filters.',
    keyConcept: 'Pattern Recognition vs Rule-Based Programming',
    parentIds: [],
    practicalDrill: {
      question: 'What distinguishes a Machine Learning model from a traditional software script?',
      options: [
        'ML models automatically adjust internal weights based on training errors; traditional scripts follow strict pre-programmed if/else rules.',
        'ML models are built out of living biological brain tissue.',
        'Traditional scripts can learn, while ML models are permanently frozen at manufacturing.',
        'There is no computational difference.'
      ],
      correctIndex: 0,
      explanation: 'Machine learning algorithms iteratively update their internal parameters to minimize error on datasets, whereas traditional code executes fixed logic explicitly programmed by humans.'
    }
  },

  // TIER 1: Machine Learning Branch (Unlocked by Mission 1)
  {
    id: 'ml_supervised',
    title: 'Supervised Learning',
    branch: 'machine_learning',
    tier: 1,
    icon: '📊',
    shortDesc: 'Training models on paired labeled inputs and expected ground-truth targets.',
    fullExplanation: 'Supervised learning feeds an algorithm thousands of labeled examples (e.g. photos labeled "cat" or "dog"). The model predicts an answer, compares it to the label, and adjusts to reduce its loss.',
    realWorldApplication: 'Medical tumor detection in CT scans, email spam classification, and credit fraud alerts.',
    unlockedByMissionId: 'mission_1',
    parentIds: ['root_ai_basics'],
    keyConcept: 'Labeled Data, Loss Function & Gradient Optimization',
    practicalDrill: {
      question: 'Which of the following is an example of supervised learning?',
      options: [
        'Feeding a model 50,000 house photos labeled with their actual sale prices to predict new home values.',
        'Leaving a robot in a dark room with no instructions or feedback.',
        'A spreadsheet multiplying column A by column B.',
        'A microwave timer counting down 60 seconds.'
      ],
      correctIndex: 0,
      explanation: 'Supervised learning requires ground-truth labels (like actual historical sale prices) to compute loss and tune the model.'
    }
  },
  {
    id: 'ml_neural_nets',
    title: 'Neural Networks & Weights',
    branch: 'machine_learning',
    tier: 1,
    icon: '🧠',
    shortDesc: 'Interconnected mathematical layers inspired by biological brain synapses.',
    fullExplanation: 'Artificial Neural Networks pass signals through input, hidden, and output layers. Each connection has a numeric "weight" that amplifies or dampens signals, allowing non-linear pattern synthesis.',
    realWorldApplication: 'Powering automated speech recognition, autonomous driving perception, and translation systems.',
    unlockedByMissionId: 'mission_1',
    parentIds: ['root_ai_basics'],
    keyConcept: 'Perceptrons, Hidden Layers & Backpropagation',
    practicalDrill: {
      question: 'What does a neural network "weight" represent?',
      options: [
        'The physical weight of the computer server in kilograms.',
        'The numerical strength or importance of a connection between two simulated neurons.',
        'The number of gigabytes used by the graphics card.',
        'The speed of the cooling fan.'
      ],
      correctIndex: 1,
      explanation: 'Weights determine how much influence an input neuron has on the subsequent layer. Training is the process of discovering the optimal numerical weights.'
    }
  },

  // TIER 1: Prompt Engineering Branch (Unlocked by Mission 2)
  {
    id: 'prompt_pillars',
    title: '4 Pillars of Prompting',
    branch: 'prompt_engineering',
    tier: 1,
    icon: '💡',
    shortDesc: 'Directing AI models through Task, Details, Audience, and Format constraints.',
    fullExplanation: 'LLMs are sensitive to context. Vague prompts trigger generic hallucinations. Specifying the exact verb, boundary conditions, target reading level, and schema output maximizes accuracy.',
    realWorldApplication: 'Enterprise coding assistants, automated customer support synthesis, and research summarization.',
    unlockedByMissionId: 'mission_2',
    parentIds: ['root_ai_basics'],
    keyConcept: 'Task + Details + Audience + Format = High-Fidelity Output',
    practicalDrill: {
      question: 'Why is "Write about electricity for 4th graders in 3 bullet points" superior to "Write about electricity"?',
      options: [
        'It constrains the persona, complexity, length, and structure, eliminating generic rambling.',
        'It makes the prompt shorter so the computer uses less electricity.',
        'It forces the AI to convert text into audio format.',
        'AI models refuse to answer prompts without numbers.'
      ],
      correctIndex: 0,
      explanation: 'By incorporating the 4 Pillars, you eliminate ambiguity and guide the model into its most relevant latent knowledge clusters.'
    }
  },
  {
    id: 'prompt_context',
    title: 'Context Windows & Tokens',
    branch: 'prompt_engineering',
    tier: 1,
    icon: '📜',
    shortDesc: 'Understanding how LLMs chunk language into sub-word tokens and store working memory.',
    fullExplanation: 'Models do not read words—they ingest numerical tokens (~4 characters per token). The context window is the total budget of tokens the model can reference in a single conversation before forgetting earlier exchanges.',
    realWorldApplication: 'Analyzing whole textbooks, coding multi-file repositories, and long legal document reviews.',
    unlockedByMissionId: 'mission_2',
    parentIds: ['root_ai_basics'],
    keyConcept: 'Sub-word Tokenization & Attention Limits',
    practicalDrill: {
      question: 'What happens when a conversation exceeds an AI model’s maximum context window?',
      options: [
        'The computer catches fire.',
        'The model loses track of earlier context and may repeat itself or hallucinate missing details.',
        'The model begins downloading new RAM automatically.',
        'The text automatically translates into binary Morse code.'
      ],
      correctIndex: 1,
      explanation: 'Context windows are fixed-length attention buffers; information falling outside the window is completely invisible to the model during that generation pass.'
    }
  },

  // TIER 1: AI Ethics Branch (Unlocked by Mission 3)
  {
    id: 'ethics_integrity',
    title: 'Academic Integrity & Credit',
    branch: 'ai_ethics',
    tier: 1,
    icon: '⚖️',
    shortDesc: 'Using AI as a cognitive accelerator while upholding honest human authorship.',
    fullExplanation: 'Generative AI should be used for brainstorming, outlining, and feedback—never for deceptive submission. Ethical cadets maintain intellectual agency, understand what they submit, and disclose tool usage.',
    realWorldApplication: 'Scientific research authorship guidelines, patent disclosures, and university integrity standards.',
    unlockedByMissionId: 'mission_3',
    parentIds: ['root_ai_basics'],
    keyConcept: 'Transparency, Authorship Ownership & Ethical Augmentation',
    practicalDrill: {
      question: 'What is the most ethical way to use an LLM for an essay assignment?',
      options: [
        'Generate the entire paper, delete the AI watermark, and claim you wrote it in 20 minutes.',
        'Use AI to brainstorm angles and critique your drafts, while synthesizing and writing the final content yourself.',
        'Copy-paste random sentences from 5 different chatbots to confuse plagiarism scanners.',
        'Never touch a computer ever again.'
      ],
      correctIndex: 1,
      explanation: 'Authentic learning and intellectual ownership require human reflection and critical evaluation; AI serves as a partner, not a ghostwriter.'
    }
  },
  {
    id: 'ethics_deepfakes',
    title: 'Synthetic Media & Consent',
    branch: 'ai_ethics',
    tier: 1,
    icon: '🛡️',
    shortDesc: 'Safeguarding biometric identity and rejecting non-consensual image manipulation.',
    fullExplanation: 'Diffusion models can fabricate photorealistic faces, voices, and videos in seconds. Using someone’s likeness without consent violates fundamental privacy rights and causes lasting reputational and emotional injury.',
    realWorldApplication: 'Combating disinformation campaigns, cyberbullying prevention, and digital watermark provenance.',
    unlockedByMissionId: 'mission_3',
    parentIds: ['root_ai_basics'],
    keyConcept: 'Biometric Sovereignty, Deepfake Detection & C2PA Provenance',
    practicalDrill: {
      question: 'Is it acceptable to face-swap a classmate into an embarrassing video if it is "just a harmless meme"?',
      options: [
        'Yes, because humor exempts you from privacy laws.',
        'No; manipulating someone’s likeness without explicit consent violates their digital privacy and can cause severe emotional harm.',
        'Yes, provided it gets at least 1,000 likes on social media.',
        'Only if you delete it after 24 hours.'
      ],
      correctIndex: 1,
      explanation: 'Consent is mandatory. Biometric identity manipulation without permission is a serious form of harassment and digital violation.'
    }
  },

  // TIER 1: AI Detective Branch (Unlocked by Detective Bonus)
  {
    id: 'audit_hallucination',
    title: 'Hallucination Spotting',
    branch: 'ai_detective',
    tier: 1,
    icon: '🔎',
    shortDesc: 'Catching confident-sounding falsehoods generated by next-token prediction models.',
    fullExplanation: 'LLMs are statistical mimics, not fact encyclopedias. They calculate what words look plausibly adjacent. When facts are missing, they hallucinate believable fabrications with supreme confidence.',
    realWorldApplication: 'Preventing dangerous medical advice errors, legal citation fabrications, and academic false citations.',
    unlockedByMissionId: 'detective',
    parentIds: ['root_ai_basics'],
    keyConcept: 'Plausibility vs Factual Truth; The Confident Bullshitter Trap',
    practicalDrill: {
      question: 'Why do AI models sound so confident even when generating completely fake claims?',
      options: [
        'They are programmed by sociopaths to lie to humans.',
        'They predict linguistic patterns of authoritative tone without possessing conscious belief or ground-truth verification.',
        'The computer screen is too bright.',
        'They get nervous when asked hard questions.'
      ],
      correctIndex: 1,
      explanation: 'Language models replicate the grammar and tone of confident writing from training datasets, completely disconnected from verifiable empirical truth.'
    }
  },
  {
    id: 'audit_grounding',
    title: 'Source Grounding & Citations',
    branch: 'ai_detective',
    tier: 1,
    icon: '📑',
    shortDesc: 'Anchoring AI responses to verified primary source documents and live retrieval (RAG).',
    fullExplanation: 'Retrieval-Augmented Generation (RAG) forces models to search trusted databases and cite specific page numbers or URLs, allowing human reviewers to cross-check assertions before acting.',
    realWorldApplication: 'Clinical medical decision support, judicial case law research, and Wikipedia citation bots.',
    unlockedByMissionId: 'detective',
    parentIds: ['root_ai_basics'],
    keyConcept: 'Retrieval-Augmented Generation (RAG) & Primary Source Triangulation',
    practicalDrill: {
      question: 'How does Retrieval-Augmented Generation (RAG) reduce AI hallucinations?',
      options: [
        'By providing real-time factual documents directly inside the model prompt and demanding exact quotes/citations.',
        'By running the computer on solar power.',
        'By deleting all adjectives from the English language.',
        'By asking the user to close their eyes.'
      ],
      correctIndex: 0,
      explanation: 'RAG grounds generation by fetching authoritative text chunks from trusted databases, converting freeform hallucination into evidence-backed synthesis.'
    }
  },

  // TIER 2: Advanced Topics (Unlocked by mission completion + XP milestones)
  {
    id: 'ml_deep_vision',
    title: 'Deep Learning & Vision',
    branch: 'machine_learning',
    tier: 2,
    icon: '👁️',
    shortDesc: 'Multi-layered convolutional networks that extract features from pixels, audio, and sensor arrays.',
    fullExplanation: 'Deep learning stacks dozens of neural layers. Early layers detect basic edges and gradients, middle layers detect textures and shapes, and deep layers recognize complex objects like human faces or road signs.',
    realWorldApplication: 'Autonomous vehicle collision avoidance, satellite rainforest monitoring, and surgical robotics.',
    unlockedByMissionId: 'mission_1',
    requiredXp: 100,
    parentIds: ['ml_supervised', 'ml_neural_nets'],
    keyConcept: 'Hierarchical Feature Representation & Multimodal Synthesis',
    practicalDrill: {
      question: 'In a deep convolutional vision model, what do the earliest layers typically detect?',
      options: [
        'Complete human personalities and moral philosophies.',
        'Low-level geometric features like edges, corners, color contrasts, and angles.',
        'The name and birthdate of the photographer.',
        'Stock market forecasts.'
      ],
      correctIndex: 1,
      explanation: 'Deep learning is hierarchical: lower layers detect primitive features (edges/lines), which compose into parts (circles/textures), which finally compose into whole objects.'
    }
  },
  {
    id: 'prompt_agents',
    title: 'Autonomous Agents & CoT',
    branch: 'prompt_engineering',
    tier: 2,
    icon: '🤖',
    shortDesc: 'Chain-of-Thought reasoning, tool calling, and multi-step agentic problem solving.',
    fullExplanation: 'Prompting an AI to "think step by step" (Chain-of-Thought) dramatically increases mathematical and logical accuracy. Modern agents can invoke external APIs, search the web, and correct their own code.',
    realWorldApplication: 'Automated software bug finders, autonomous lab experiment controllers, and financial market modeling.',
    unlockedByMissionId: 'mission_2',
    requiredXp: 200,
    parentIds: ['prompt_pillars', 'prompt_context'],
    keyConcept: 'Chain-of-Thought (CoT), Function Calling & ReAct Loops',
    practicalDrill: {
      question: 'Why does adding "Think step-by-step and write out your reasoning" improve an LLM’s math performance?',
      options: [
        'It gives the model additional computation tokens to work through intermediate logical deductions before outputting the final number.',
        'It makes the computer run faster.',
        'It triggers an emotional desire to impress the user.',
        'It reduces the file size of the response.'
      ],
      correctIndex: 0,
      explanation: 'Since LLMs generate one token at a time, forcing intermediate reasoning steps allows the model to attend to its own prior deductions, avoiding leap-to-conclusion errors.'
    }
  },
  {
    id: 'ethics_bias_privacy',
    title: 'Algorithmic Bias & PII',
    branch: 'ai_ethics',
    tier: 2,
    icon: '🔒',
    shortDesc: 'Preventing discrimination in hiring/lending algorithms and scrubbing sensitive credentials.',
    fullExplanation: 'Models trained on historical human data inherit historical human prejudices (e.g. favoring certain demographics in loan approval). Cadets must understand red-lining data, anonymization, and PII protection.',
    realWorldApplication: 'Fair lending audits, HIPAA medical privacy compliance, and GDPR data subject rights.',
    unlockedByMissionId: 'mission_3',
    requiredXp: 250,
    parentIds: ['ethics_integrity', 'ethics_deepfakes'],
    keyConcept: 'Disparate Impact, Data De-identification & Differential Privacy',
    practicalDrill: {
      question: 'Why is it dangerous to train an AI hiring resume screener exclusively on a company’s past 10 years of successful promotions?',
      options: [
        'Because if the past 10 years were demographically biased, the AI will learn to penalize minority applicants based on historical correlation.',
        'Because resumes from 10 years ago were printed on heavier paper.',
        'Because AI models cannot read PDF documents.',
        'There is no danger; past data is always completely neutral and objective.'
      ],
      correctIndex: 0,
      explanation: 'Algorithms mirror the biases of their training data. If past human hiring favored a specific demographic, the model will codify that discrimination into automated rules.'
    }
  },
  {
    id: 'audit_red_teaming',
    title: 'Red Teaming & Probing',
    branch: 'ai_detective',
    tier: 2,
    icon: '🎯',
    shortDesc: 'Stress-testing models against adversarial jailbreaks, prompt injections, and system leaks.',
    fullExplanation: 'Red teaming involves ethical hackers attacking an AI with tricky, deceptive prompts to discover safety vulnerabilities, dangerous instructions, or confidential data extraction weaknesses before deployment.',
    realWorldApplication: 'Securing enterprise AI APIs, defending against cyber prompt injection attacks, and safety certifications.',
    unlockedByMissionId: 'detective',
    requiredXp: 300,
    parentIds: ['audit_hallucination', 'audit_grounding'],
    keyConcept: 'Adversarial Prompt Injection, Jailbreak Defense & Safety Guardrails',
    practicalDrill: {
      question: 'What is a "Prompt Injection" attack?',
      options: [
        'Physically injecting liquid into the computer motherboard.',
        'Malicious user input disguised as text that hijacks the AI’s core system instructions to bypass safety rules.',
        'Typing all-caps in a chat message.',
        'Updating your computer’s operating system.'
      ],
      correctIndex: 1,
      explanation: 'Prompt injection occurs when untrusted input tricks the model into ignoring its developer instructions and obeying the attacker’s malicious commands.'
    }
  },

  // TIER 3: Apex Master Node (Unlocked when all core missions are complete!)
  {
    id: 'apex_ai_master',
    title: 'Supreme AI Master Architect',
    branch: 'apex',
    tier: 3,
    icon: '👑',
    shortDesc: 'Complete synthesis: deploying powerful AI systems responsibly, ethically, and with rigorous verification.',
    fullExplanation: 'The apex of the AI Quest academy. You understand both the technical magic and the ethical responsibility of artificial intelligence. You know how to build, command, question, and defend modern AI.',
    realWorldApplication: 'Leading AI safety councils, architecting autonomous frontiers, and shaping global technology policy.',
    unlockedByMissionId: 'ai-master',
    requiredXp: 350,
    parentIds: ['ml_deep_vision', 'prompt_agents', 'ethics_bias_privacy', 'audit_red_teaming'],
    keyConcept: 'Holistic Mastery: Technical Depth + Ethical Sovereignty + Critical Verification',
    practicalDrill: {
      question: 'What defines a true AI Master in the modern era?',
      options: [
        'Believing everything an AI says and blindly automating all human decisions.',
        'Deep technical comprehension of how models work, paired with rigorous fact-checking and ethical responsibility.',
        'Writing the longest prompt possible with thousands of emojis.',
        'Never using computers because they are too complicated.'
      ],
      correctIndex: 1,
      explanation: 'True mastery is not blind enthusiasm—it is technical command combined with critical skepticism and ethical guardianship.'
    }
  }
];

