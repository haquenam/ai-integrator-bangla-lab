export const agentStudioStorageKey = 'ai-integrator-bangla-lab-agent-studio';
export const agentStudioPracticeBriefStorageKey = 'ai-integrator-bangla-lab-practice-brief';

export const agentStudioIntro = {
  eyebrow: 'সহকারী পরিকল্পনা',
  title: 'এজেন্ট প্র্যাকটিস স্টুডিও',
  subtitle: 'অনুশীলন ব্রিফ থেকে সহকারী তৈরির প্রস্তুতি নিন',
  description:
    'এখানে আপনি অনুশীলন ব্রিফকে একটি সহকারী তৈরির প্যাকে রূপ দিতে পারবেন। এই প্যাকটি ব্যবহার করে পরে কাস্টম জিপিটি, কোপাইলট এজেন্ট, ডকুমেন্ট সহকারী বা ওয়েবসাইট সহকারীর পরিকল্পনা করা যাবে।',
  safetyNote:
    'এটি শুধু শেখা ও অনুশীলনের জন্য। বাস্তব ক্লায়েন্ট তথ্য, ব্যক্তিগত তথ্য বা গোপন ব্যবসার তথ্য ব্যবহার করবেন না।',
};

export const agentStudioSelectFields = [
  {
    id: 'assistantType',
    label: 'সহকারীর ধরন',
    options: ['কাস্টম জিপিটি', 'কোপাইলট এজেন্ট', 'ডকুমেন্ট সহকারী', 'ওয়েবসাইট সহকারী', 'গ্রাহক সহকারী'],
  },
  {
    id: 'useCase',
    label: 'ব্যবহারের ক্ষেত্র',
    options: [
      'গ্রাহক প্রশ্নের উত্তর',
      'ডকুমেন্ট থেকে উত্তর',
      'পণ্য বা সেবার তথ্য',
      'বুকিং বা অ্যাপয়েন্টমেন্ট',
      'নীতিমালা ব্যাখ্যা',
      'সাপোর্ট অনুরোধ বাছাই',
      'কন্টেন্ট খসড়া তৈরি',
      'লিড সংগ্রহ',
    ],
  },
  {
    id: 'tone',
    label: 'ভাষার ধরন',
    options: ['সহজ ও বন্ধুসুলভ', 'পেশাদার ও সংক্ষিপ্ত', 'শিক্ষামূলক ও ব্যাখ্যামূলক', 'ভদ্র ও সহায়ক'],
  },
  {
    id: 'safetyLevel',
    label: 'নিরাপত্তার স্তর',
    options: ['সাধারণ', 'নিয়ন্ত্রিত', 'কঠোর'],
  },
  {
    id: 'knowledgeSource',
    label: 'তথ্যের উৎস',
    options: [
      'প্রশ্নোত্তর তালিকা',
      'পণ্য বা সেবার তালিকা',
      'নীতিমালা ফাইল',
      'ডকুমেন্ট বা পিডিএফ',
      'ওয়েবসাইট তথ্য',
      'অনুশীলন ডেটা',
    ],
  },
];

export const defaultAgentStudioSelections = agentStudioSelectFields.reduce(
  (selections, field) => ({ ...selections, [field.id]: field.options[0] }),
  {
    assistantName: 'সহায়ক এআই সহকারী',
    assistantTask: 'ব্যবসার সাধারণ প্রশ্ন বুঝে নিরাপদ, পরিষ্কার এবং সহায়ক উত্তর দেওয়া।',
  },
);

export const agentStudioMessages = {
  copiedFullPack: 'এজেন্ট প্যাক কপি হয়েছে',
  copiedInstructions: 'নির্দেশনা কপি হয়েছে',
  copyFailed: 'কপি করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।',
  reset: 'এজেন্ট প্যাক মুছে ফেলা হয়েছে',
  generated: 'এজেন্ট প্যাক তৈরি হয়েছে',
  practiceBriefFound:
    'আপনার সর্বশেষ অনুশীলন ব্রিফ পাওয়া গেছে। চাইলে সেটির ভিত্তিতে এজেন্ট প্যাক তৈরি করতে পারেন।',
};

const knowledgeChecklist = {
  'প্রশ্নোত্তর তালিকা': ['সাধারণ প্রশ্ন', 'অনুমোদিত উত্তর', 'যোগাযোগের নিয়ম', 'যেসব বিষয়ে উত্তর দেওয়া যাবে না'],
  'পণ্য বা সেবার তালিকা': [
    'পণ্য বা সেবার তালিকা',
    'দাম বা প্যাকেজ',
    'সুবিধা ও সীমাবদ্ধতা',
    'ফেরত বা পরিবর্তন নীতিমালা',
    'যোগাযোগের নিয়ম',
  ],
  'নীতিমালা ফাইল': ['নীতিমালা', 'প্রযোজ্য শর্ত', 'ব্যতিক্রম', 'মানুষের কাছে পাঠানোর নিয়ম', 'যেসব বিষয়ে উত্তর দেওয়া যাবে না'],
  'ডকুমেন্ট বা পিডিএফ': ['ডকুমেন্ট', 'বিষয়ভিত্তিক সারাংশ', 'সূত্রের নাম', 'প্রশ্নোত্তর সীমা', 'তথ্য না থাকলে উত্তর'],
  'ওয়েবসাইট তথ্য': ['ওয়েবসাইটের প্রধান পাতা', 'পণ্য বা সেবার পাতা', 'যোগাযোগ পাতা', 'নীতিমালা', 'দ্রুত প্রশ্ন'],
  'অনুশীলন ডেটা': ['অনুশীলন ব্রিফ', 'ব্যবসার প্রেক্ষাপট', 'সমস্যার বিবরণ', 'পরীক্ষার প্রশ্ন', 'গ্রহণযোগ্যতার চেকলিস্ট'],
};

const safetyGuardrails = {
  সাধারণ: [
    'শুধু নির্ধারিত বিষয় ও দেওয়া তথ্যের মধ্যে উত্তর দিন।',
    'তথ্য না থাকলে অনুমান না করে বলুন যে তথ্যটি নলেজ বেসে নেই।',
    'গোপন বা ব্যক্তিগত তথ্য চাইবেন না।',
  ],
  নিয়ন্ত্রিত: [
    'শুধু নির্ধারিত বিষয় ও দেওয়া তথ্যের মধ্যে উত্তর দিন।',
    'প্রশ্ন অস্পষ্ট হলে উত্তর দেওয়ার আগে পরিষ্কার করার জন্য অতিরিক্ত প্রশ্ন করুন।',
    'অনিশ্চিত, সংবেদনশীল বা ঝুঁকিপূর্ণ প্রশ্ন মানুষের কাছে পাঠাতে বলুন।',
    'তথ্য না থাকলে অনুমান না করে সীমাবদ্ধতা জানান।',
    'গোপন বা ব্যক্তিগত তথ্য চাইবেন না।',
  ],
  কঠোর: [
    'শুধু নির্ধারিত বিষয় ও দেওয়া তথ্যের মধ্যে উত্তর দিন।',
    'আইনি, চিকিৎসা, আর্থিক বা ব্যক্তিগত পরামর্শ দেবেন না।',
    'সংবেদনশীল সিদ্ধান্তের আগে সবসময় মানুষের পর্যালোচনা নিতে বলুন।',
    'ব্যক্তিগত, গোপন বা ব্যবসার গোপন তথ্য প্রক্রিয়া করবেন না।',
    'তথ্য না থাকলে অনুমান না করে সীমাবদ্ধতা জানান এবং মানুষের সাহায্য নিতে বলুন।',
  ],
};

const platformSteps = {
  'কাস্টম জিপিটি': [
    'কাস্টম জিপিটি নির্মাতা খুলুন',
    'নাম ও বিবরণ বসান',
    'নির্দেশনা পেস্ট করুন',
    'নলেজ ফাইল যুক্ত করুন',
    'ওয়েব সার্চ দরকার না হলে বন্ধ রাখুন',
    'টেস্ট প্রশ্ন দিয়ে পরীক্ষা করুন',
    'শেয়ার করার আগে অনুমতি ও গোপনীয়তা বিবেচনা করুন',
  ],
  'কোপাইলট এজেন্ট': [
    'কোপাইলট এজেন্ট নির্মাতা খুলুন',
    'এজেন্টের কাজ নির্ধারণ করুন',
    'নলেজ উৎস যুক্ত করুন',
    'টপিক বা কথোপকথনের ধাপ সাজান',
    'মানুষের কাছে পাঠানোর নিয়ম যোগ করুন',
    'টেস্ট করে প্রকাশের আগে অনুমতি যাচাই করুন',
  ],
  'ডকুমেন্ট সহকারী': [
    'ডকুমেন্ট গুছিয়ে নিন',
    'প্রশ্নোত্তর সীমা নির্ধারণ করুন',
    'তথ্য না থাকলে কী বলবে তা লিখুন',
    'সূত্রভিত্তিক উত্তর পরীক্ষা করুন',
  ],
  'ওয়েবসাইট সহকারী': [
    'ওয়েবসাইটে কোথায় সহকারী বসবে তা ঠিক করুন',
    'প্রথম স্বাগত বার্তা লিখুন',
    'দ্রুত প্রশ্ন সাজান',
    'মানুষের সঙ্গে যোগাযোগের পথ রাখুন',
  ],
  'গ্রাহক সহকারী': [
    'সাধারণ প্রশ্ন সাজান',
    'সাপোর্ট বা বিক্রয় প্রশ্ন আলাদা করুন',
    'অস্পষ্ট প্রশ্নে অতিরিক্ত তথ্য চাইতে বলুন',
    'জরুরি বিষয়ে মানুষের কাছে পাঠানোর নিয়ম রাখুন',
  ],
};

function listItems(items) {
  return items.map((item) => `• ${item}`).join('\n');
}

function numberedItems(items) {
  return items.map((item, index) => `${index + 1}. ${item}`).join('\n');
}

function findPracticeSection(brief, label) {
  return brief?.sections?.find((section) => section.label === label)?.content || '';
}

export function getPracticeBriefContext(brief) {
  if (!brief?.sections || !brief?.selections) {
    return null;
  }

  return {
    title: findPracticeSection(brief, 'অনুশীলনের শিরোনাম') || 'সর্বশেষ অনুশীলন ব্রিফ',
    businessContext: findPracticeSection(brief, 'ব্যবসার প্রেক্ষাপট'),
    problem: findPracticeSection(brief, 'সমস্যার বিবরণ'),
    selections: brief.selections,
  };
}

function buildContextLine(practiceContext) {
  if (!practiceContext) {
    return '';
  }

  const selectedContext = [
    practiceContext.selections?.businessType,
    practiceContext.selections?.problemType,
    practiceContext.selections?.assistantType,
    practiceContext.selections?.difficultyLevel,
    practiceContext.selections?.learningStage,
  ]
    .filter(Boolean)
    .join(', ');

  return `\nঅনুশীলন ব্রিফ: ${practiceContext.title}\nনির্বাচিত প্রেক্ষাপট: ${selectedContext}\nব্যবসার প্রেক্ষাপট: ${practiceContext.businessContext || 'ব্রিফে দেওয়া প্রেক্ষাপট ব্যবহার করুন।'}\nসমস্যা: ${practiceContext.problem || 'ব্রিফে দেওয়া সমস্যা ব্যবহার করুন।'}`;
}

export function generateAgentPack(selections, practiceContext = null) {
  const assistantName = selections.assistantName.trim() || defaultAgentStudioSelections.assistantName;
  const assistantTask = selections.assistantTask.trim() || defaultAgentStudioSelections.assistantTask;
  const contextLine = buildContextLine(practiceContext);
  const description = `${assistantName} একটি ${selections.assistantType}, যার কাজ হলো ${selections.useCase} বিষয়ে ${selections.tone} ভঙ্গিতে সহায়ক উত্তর দেওয়া।`;
  const useContext = `${assistantName} ${selections.assistantType} হিসেবে ${selections.useCase} কাজে ব্যবহার হবে। এটি ${selections.knowledgeSource} থেকে প্রস্তুত নলেজ বেস ব্যবহার করে শিক্ষামূলক অনুশীলনে সহায়তা করবে।${contextLine}`;

  const instructions = [
    `ভূমিকা: আপনি ${assistantName}, একটি ${selections.assistantType}।`,
    `উদ্দেশ্য: ${assistantTask}`,
    `শ্রোতা: শিক্ষার্থী, দল বা ব্যবসার ব্যবহারকারী যারা ${selections.useCase} বিষয়ে পরিষ্কার সহায়তা চান।`,
    `অনুমোদিত তথ্যের উৎস: শুধু ${selections.knowledgeSource} এবং দেওয়া অনুশীলন উপকরণের তথ্য ব্যবহার করুন।`,
    `উত্তরের ধরন: ${selections.tone} ভাষায় সংক্ষিপ্ত, পরিষ্কার এবং ধাপে ধাপে উত্তর দিন।`,
    'তথ্য না থাকলে: অনুমান করবেন না। বলুন যে তথ্যটি নলেজ বেসে নেই এবং কোন তথ্য দিলে উত্তর দেওয়া যাবে তা জানান।',
    'মানুষের সাহায্য: সংবেদনশীল, ঝুঁকিপূর্ণ, জরুরি বা অনুমতির প্রয়োজন এমন ক্ষেত্রে মানুষের সাহায্য নিতে বলুন।',
  ].join('\n');

  const answerRules = listItems([
    'শুধু দেওয়া তথ্যের ভিত্তিতে উত্তর দিন।',
    'তথ্য না থাকলে অনুমান করবেন না।',
    'ব্যবহারকারীর প্রশ্ন পরিষ্কার না হলে অতিরিক্ত প্রশ্ন করুন।',
    'ব্যক্তিগত বা গোপন তথ্য চাইবেন না।',
    'ঝুঁকিপূর্ণ ক্ষেত্রে মানুষের সাহায্য নিতে বলুন।',
  ]);

  const knowledgeBase = listItems([
    ...(knowledgeChecklist[selections.knowledgeSource] || knowledgeChecklist['প্রশ্নোত্তর তালিকা']),
    'যোগাযোগের নিয়ম',
    'যেসব বিষয়ে উত্তর দেওয়া যাবে না',
  ]);

  const testQuestions = listItems([
    `${selections.useCase} বিষয়ে সাধারণ একটি প্রশ্ন করলে আপনি কীভাবে উত্তর দেবেন?`,
    `${selections.knowledgeSource} থেকে পাওয়া তথ্য অনুযায়ী একটি নির্দিষ্ট তথ্য ব্যাখ্যা করুন।`,
    'এটা করলে হবে?',
    'আপনার নির্ধারিত বিষয়ের বাইরে একটি ব্যক্তিগত সিদ্ধান্ত নিয়ে পরামর্শ দিন।',
    'যে তথ্য নলেজ বেসে নেই, সেটি জানতে চাইলে আপনি কী বলবেন?',
  ]);

  const demoScript = numberedItems([
    `${assistantName} পরিচয় দিন এবং বলুন এটি শেখা ও অনুশীলনের জন্য তৈরি।`,
    `${selections.useCase} বিষয়ে একটি সাধারণ টেস্ট প্রশ্ন করুন।`,
    'অস্পষ্ট প্রশ্ন করলে সহকারী কীভাবে অতিরিক্ত প্রশ্ন করে তা দেখান।',
    'নলেজ বেসে তথ্য না থাকলে সহকারী অনুমান না করে কীভাবে সীমাবদ্ধতা জানায় তা দেখান।',
    'শেষে নলেজ বেস, গার্ডরেইল এবং পোর্টফোলিও প্রমাণ সংক্ষেপে দেখান।',
  ]);

  const sections = [
    { label: 'সহকারীর নাম', content: assistantName },
    { label: 'সংক্ষিপ্ত বিবরণ', content: description },
    { label: 'ব্যবহারের প্রেক্ষাপট', content: useContext },
    { label: 'মূল নির্দেশনা', content: instructions },
    { label: 'উত্তর দেওয়ার নিয়ম', content: answerRules },
    { label: 'নলেজ বেস প্রস্তুতি', content: knowledgeBase },
    { label: 'গার্ডরেইল', content: listItems(safetyGuardrails[selections.safetyLevel] || safetyGuardrails['সাধারণ']) },
    { label: 'পরীক্ষার প্রশ্ন', content: testQuestions },
    { label: 'ডেমো স্ক্রিপ্ট', content: demoScript },
    {
      label: 'পোর্টফোলিও প্রমাণ',
      content: listItems([
        'স্ক্রিনশট',
        'সহকারীর নির্দেশনা',
        'নলেজ বেস তালিকা',
        'পরীক্ষার প্রশ্ন ও উত্তর',
        'ডেমো স্ক্রিপ্ট',
        'রিডমি খসড়া',
      ]),
    },
    {
      label: 'বাস্তব প্ল্যাটফর্মে নেওয়ার ধাপ',
      content: listItems(platformSteps[selections.assistantType] || platformSteps['কাস্টম জিপিটি']),
    },
  ];

  return {
    generatedAt: new Date().toISOString(),
    selections: { ...selections, assistantName, assistantTask },
    usedPracticeBrief: Boolean(practiceContext),
    practiceContext,
    sections,
  };
}

export function formatAgentPack(pack) {
  if (!pack?.sections) {
    return '';
  }

  return pack.sections.map((section) => `${section.label}\n${section.content}`).join('\n\n');
}

export function getAgentInstructions(pack) {
  return pack?.sections?.find((section) => section.label === 'মূল নির্দেশনা')?.content || '';
}
