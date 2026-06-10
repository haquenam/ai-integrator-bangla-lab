export const clientBriefStorageKey = 'ai-integrator-bangla-lab-client-brief';

export const solutionTypeOptions = [
  'অ্যান্ড্রয়েড অ্যাপ',
  'ওয়েব অ্যাপ',
  'কাস্টম জিপিটি',
  'কোপাইলট এজেন্ট',
  'ডকুমেন্ট সহকারী',
  'ওয়েবসাইট সহকারী',
  'অটোমেশন টুল',
];

export const languageOptions = [
  'বাংলা প্রথম',
  'ইংরেজি প্রথম',
  'দুই ভাষা পরে',
  'সহজ বাংলা',
  'পেশাদার বাংলা',
];

export const toneOptions = [
  'সহজ ও বন্ধুসুলভ',
  'পেশাদার ও সংক্ষিপ্ত',
  'শিক্ষামূলক ও ব্যাখ্যামূলক',
  'কর্পোরেট ও পরিষ্কার',
  'শিশু বা নতুনদের উপযোগী',
];

export const pathLabelOptions = [
  'নতুন ব্যবহারকারী পথ',
  'দ্রুত সহায়তা পথ',
  'শেখার পথ',
  'সাপোর্ট পথ',
  'ক্যারিয়ার পথ',
];

export const featureOptions = [
  'হোম স্ক্রিন',
  'লার্নিং পাথ',
  'ভিডিও দেখার অংশ',
  'ডকুমেন্ট পড়ার অংশ',
  'এআই সহকারী লিংক',
  'জরুরি সহায়তা',
  'কোর্স পরিচিতি',
  'ইনস্ট্রাক্টর বা কোম্পানি পরিচিতি',
  'গ্রাহক প্রশ্নোত্তর',
  'পণ্য বা সেবা তালিকা',
  'বুকিং বা অ্যাপয়েন্টমেন্ট',
  'সাপোর্ট অনুরোধ',
  'পোর্টফোলিও বা প্রমাণ অংশ',
];

export const mvpIncludeOptions = [
  'হোম',
  'প্রধান ফিচার',
  'ভিডিও বা রিসোর্স লিংক',
  'ডকুমেন্ট লিংক',
  'সহকারী বা চ্যাট লিংক',
  'জরুরি বা সাপোর্ট তথ্য',
  'পরিচিতি অংশ',
  'যোগাযোগ অংশ',
];

export const mvpExcludeOptions = [
  'লগইন',
  'পেমেন্ট',
  'ব্যাকএন্ড ডাটাবেস',
  'নেটিভ এআই চ্যাটবট',
  'সার্টিফিকেট',
  'পুশ নোটিফিকেশন',
  'পূর্ণ কুইজ ইঞ্জিন',
  'ফাইল আপলোড',
  'অ্যাডমিন প্যানেল',
  'রিয়েল টাইম চ্যাট',
];

export const designPreferenceOptions = [
  'সরল ও পরিষ্কার',
  'শিক্ষামূলক',
  'কর্পোরেট',
  'মোবাইল প্রথম',
  'রঙিন কিন্তু পরিষ্কার',
  'গাঢ় ব্যাকগ্রাউন্ড',
  'হালকা ব্যাকগ্রাউন্ড',
];

export const futureClientBriefItems = [
  'মার্কডাউন ডাউনলোড',
  'পিডিএফ ডাউনলোড',
  'ওয়ার্ড ডকুমেন্ট ডাউনলোড',
  'বিভিন্ন প্রজেক্ট টাইপের আলাদা টেমপ্লেট',
  'ক্লায়েন্ট অনুমোদন চেকলিস্ট',
  'প্রস্তাবনা খসড়া',
];

export const defaultClientBriefFields = {
  projectName: '',
  solutionType: '',
  tagline: '',
  clientName: '',
  contactLink: '',
  projectPurpose: '',
  websiteLink: '',
  videoLink: '',
  documentLink: '',
  assistantLink: '',
  profileLink: '',
  otherLinks: '',
  primaryLanguage: '',
  writingTone: '',
  terminologyRule: '',
  bannedWords: '',
  requiredPhrases: '',
  targetUsers: '',
  mainUseCase: '',
  userProblem: '',
  primaryPath: '',
  alternativePath: '',
  logoStatus: '',
  primaryColor: '',
  secondaryColor: '',
  accentColor: '',
  imageStatus: '',
  visualRestrictions: '',
  designPreference: '',
  disallowedData: '',
  disallowedAnswers: '',
  humanHelpTrigger: '',
  privacyNote: '',
  legalLimitations: '',
  approvalNeed: '',
  extraRequests: '',
  deadline: '',
  firstDemo: '',
  postponedItems: '',
  otherNotes: '',
};

export const clientBriefGroups = [
  {
    title: 'প্রজেক্ট পরিচয়',
    helper: 'প্রজেক্টের মৌলিক পরিচয় ও লক্ষ্য পরিষ্কার করুন।',
    fields: [
      { id: 'projectName', label: 'প্রজেক্টের নাম', type: 'input', placeholder: 'যেমন: বাংলা কোর্স সহকারী' },
      { id: 'solutionType', label: 'সমাধানের ধরন', type: 'select', options: solutionTypeOptions },
      { id: 'tagline', label: 'এক লাইনের ট্যাগলাইন', type: 'input', placeholder: 'যেমন: শিক্ষার্থীদের দ্রুত সহায়তার জায়গা' },
      { id: 'clientName', label: 'ক্লায়েন্ট বা প্রতিষ্ঠানের নাম', type: 'input', placeholder: 'ব্যক্তিগত তথ্য না দিয়ে নিরাপদ নাম লিখুন' },
      { id: 'contactLink', label: 'যোগাযোগের ইমেইল বা লিংক', type: 'input', placeholder: 'যেমন: ওয়েবসাইটের যোগাযোগ পেজ' },
      { id: 'projectPurpose', label: 'প্রজেক্টের উদ্দেশ্য', type: 'textarea', placeholder: 'এই প্রজেক্ট কী সমস্যা সমাধান করবে এবং কেন দরকার?' },
    ],
  },
  {
    title: 'প্রধান লিংক ও তথ্য',
    helper: 'যে নিরাপদ পাবলিক লিংকগুলো ব্রিফে দরকার, সেগুলো যোগ করুন।',
    fields: [
      { id: 'websiteLink', label: 'ওয়েবসাইট লিংক', type: 'input', placeholder: 'যেমন: প্রতিষ্ঠানের হোমপেজ' },
      { id: 'videoLink', label: 'ইউটিউব বা ভিডিও লিংক', type: 'input', placeholder: 'যেমন: পরিচিতি ভিডিও' },
      { id: 'documentLink', label: 'ডকুমেন্ট বা গাইড লিংক', type: 'input', placeholder: 'যেমন: পাবলিক গাইড বা README' },
      { id: 'assistantLink', label: 'চ্যাটবট বা সহকারী লিংক', type: 'input', placeholder: 'যদি আগে কোনো সহকারী থাকে' },
      { id: 'profileLink', label: 'প্রোফাইল বা পরিচিতি লিংক', type: 'input', placeholder: 'যেমন: GitHub, লিংকডইন বা পরিচিতি পেজ' },
      { id: 'otherLinks', label: 'অন্যান্য প্রয়োজনীয় লিংক', type: 'textarea', placeholder: 'প্রতিটি লিংক আলাদা লাইনে লিখুন।' },
    ],
  },
  {
    title: 'ভাষা ও ব্যবহার অভিজ্ঞতা',
    helper: 'ব্যবহারকারী কী ধরনের ভাষা ও নির্দেশনা দেখবে তা নির্ধারণ করুন।',
    fields: [
      { id: 'primaryLanguage', label: 'প্রধান ভাষা', type: 'select', options: languageOptions },
      { id: 'writingTone', label: 'লেখার ধরন', type: 'select', options: toneOptions },
      { id: 'terminologyRule', label: 'প্রযুক্তিগত শব্দ ব্যবহারের নিয়ম', type: 'textarea', placeholder: 'যেমন: প্রয়োজন হলে API, এমভিপি, GitHub রাখা যাবে; বাকিটা সহজ বাংলায়।' },
      { id: 'bannedWords', label: 'যে শব্দ ব্যবহার করা যাবে না', type: 'textarea', placeholder: 'যেমন: অতিরঞ্জিত দাবি, নিশ্চয়তা বা বিভ্রান্তিকর শব্দ।' },
      { id: 'requiredPhrases', label: 'যে বাক্য বা ভাষা অবশ্যই রাখতে হবে', type: 'textarea', placeholder: 'যেমন: এটি শেখা ও প্রস্তুতির জন্য।' },
    ],
  },
  {
    title: 'ব্যবহারকারী ও পথ',
    helper: 'কার জন্য বানানো হচ্ছে এবং তারা কোন পথে কাজ শেষ করবে তা লিখুন।',
    fields: [
      { id: 'targetUsers', label: 'লক্ষ্য ব্যবহারকারী কারা', type: 'textarea', placeholder: 'যেমন: নতুন শিক্ষার্থী, ছোট ব্যবসার মালিক বা সাপোর্ট টিম।' },
      { id: 'mainUseCase', label: 'প্রধান ব্যবহার পরিস্থিতি', type: 'textarea', placeholder: 'ব্যবহারকারী কখন এই অ্যাপ বা সহকারী ব্যবহার করবে?' },
      { id: 'userProblem', label: 'ব্যবহারকারীর সমস্যা', type: 'textarea', placeholder: 'বর্তমানে ব্যবহারকারীর কোন কাজ কঠিন বা সময়সাপেক্ষ?' },
      { id: 'primaryPath', label: 'প্রধান ব্যবহার পথ', type: 'select', options: pathLabelOptions },
      { id: 'alternativePath', label: 'বিকল্প ব্যবহার পথ', type: 'textarea', placeholder: 'প্রধান পথ কাজ না করলে ব্যবহারকারী কী করবে?' },
    ],
  },
  {
    title: 'ব্র্যান্ডিং ও ভিজ্যুয়াল',
    helper: 'রং, ছবি ও ভিজ্যুয়াল পছন্দের সহজ নির্দেশনা দিন।',
    fields: [
      { id: 'logoStatus', label: 'লোগো আছে কি না', type: 'input', placeholder: 'যেমন: আছে, নেই, পরে দেওয়া হবে' },
      { id: 'primaryColor', label: 'প্রধান রং', type: 'input', placeholder: 'যেমন: নেভি নীল' },
      { id: 'secondaryColor', label: 'দ্বিতীয় রং', type: 'input', placeholder: 'যেমন: হালকা নীল' },
      { id: 'accentColor', label: 'অ্যাকসেন্ট রং', type: 'input', placeholder: 'যেমন: কমলা বা সবুজ' },
      { id: 'imageStatus', label: 'ছবি আছে কি না', type: 'input', placeholder: 'যেমন: নিরাপদ স্টক ছবি ব্যবহার করা যাবে' },
      { id: 'visualRestrictions', label: 'কোন ভিজ্যুয়াল সীমাবদ্ধতা আছে কি না', type: 'textarea', placeholder: 'যেমন: নির্দিষ্ট ছবি ব্যবহার করা যাবে না, ব্র্যান্ড রং বদলানো যাবে না।' },
      { id: 'designPreference', label: 'ডিজাইন পছন্দ', type: 'select', options: designPreferenceOptions },
    ],
  },
  {
    title: 'নিরাপত্তা ও সীমাবদ্ধতা',
    helper: 'কোন তথ্য, উত্তর বা দাবি এড়াতে হবে তা আগে থেকেই নির্ধারণ করুন।',
    fields: [
      { id: 'disallowedData', label: 'কোন তথ্য ব্যবহার করা যাবে না', type: 'textarea', placeholder: 'যেমন: ব্যক্তিগত ফোন নম্বর, জাতীয় পরিচয়পত্র, গোপন ব্যবসার তথ্য।' },
      { id: 'disallowedAnswers', label: 'কোন উত্তর দেওয়া যাবে না', type: 'textarea', placeholder: 'যেমন: আইনি, চিকিৎসা বা আর্থিক নিশ্চয়তামূলক পরামর্শ।' },
      { id: 'humanHelpTrigger', label: 'মানুষের সাহায্য কখন লাগবে', type: 'textarea', placeholder: 'যেমন: দাম, চুক্তি, ব্যক্তিগত সমস্যা বা অভিযোগ এলে।' },
      { id: 'privacyNote', label: 'গোপনীয়তা নোট', type: 'textarea', placeholder: 'ব্যবহারকারীকে কোন সতর্কতা দেখাতে হবে?' },
      { id: 'legalLimitations', label: 'আইনি বা সংবেদনশীল সীমাবদ্ধতা', type: 'textarea', placeholder: 'যদি কোনো আইনগত বা সংবেদনশীল সীমা থাকে লিখুন।' },
      { id: 'approvalNeed', label: 'ক্লায়েন্ট অনুমোদনের প্রয়োজন আছে কি না', type: 'input', placeholder: 'যেমন: প্রথম ডেমোর আগে স্কোপ অনুমোদন দরকার' },
    ],
  },
  {
    title: 'অতিরিক্ত নোট',
    helper: 'ডেমো, সময়সীমা ও পরবর্তী কাজের বিশেষ নির্দেশনা লিখুন।',
    fields: [
      { id: 'extraRequests', label: 'ক্লায়েন্টের অতিরিক্ত অনুরোধ', type: 'textarea', placeholder: 'যে অনুরোধ এখনো পরিষ্কার নয়, এখানে লিখুন।' },
      { id: 'deadline', label: 'ডেডলাইন', type: 'input', placeholder: 'যেমন: প্রথম ডেমো ২ সপ্তাহের মধ্যে' },
      { id: 'firstDemo', label: 'প্রথম ডেমোতে কী দেখাতে হবে', type: 'textarea', placeholder: 'ডেমোতে কোন স্ক্রিন, ফ্লো বা আউটপুট দেখানো হবে?' },
      { id: 'postponedItems', label: 'কোন বিষয় পরে রাখা হবে', type: 'textarea', placeholder: 'যেমন: লগইন, পেমেন্ট, অ্যাডমিন প্যানেল।' },
      { id: 'otherNotes', label: 'অন্যান্য নোট', type: 'textarea', placeholder: 'আর কোনো গুরুত্বপূর্ণ প্রেক্ষাপট থাকলে লিখুন।' },
    ],
  },
];
