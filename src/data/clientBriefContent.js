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
  'About section',
  'Contact section',
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
    fields: [
      { id: 'projectName', label: 'প্রজেক্টের নাম', type: 'input' },
      { id: 'solutionType', label: 'সমাধানের ধরন', type: 'select', options: solutionTypeOptions },
      { id: 'tagline', label: 'এক লাইনের ট্যাগলাইন', type: 'input' },
      { id: 'clientName', label: 'ক্লায়েন্ট বা প্রতিষ্ঠানের নাম', type: 'input' },
      { id: 'contactLink', label: 'যোগাযোগের ইমেইল বা লিংক', type: 'input' },
      { id: 'projectPurpose', label: 'প্রজেক্টের উদ্দেশ্য', type: 'textarea' },
    ],
  },
  {
    title: 'প্রধান লিংক ও তথ্য',
    fields: [
      { id: 'websiteLink', label: 'ওয়েবসাইট লিংক', type: 'input' },
      { id: 'videoLink', label: 'ইউটিউব বা ভিডিও লিংক', type: 'input' },
      { id: 'documentLink', label: 'ডকুমেন্ট বা গাইড লিংক', type: 'input' },
      { id: 'assistantLink', label: 'চ্যাটবট বা সহকারী লিংক', type: 'input' },
      { id: 'profileLink', label: 'প্রোফাইল বা পরিচিতি লিংক', type: 'input' },
      { id: 'otherLinks', label: 'অন্যান্য প্রয়োজনীয় লিংক', type: 'textarea' },
    ],
  },
  {
    title: 'ভাষা ও ব্যবহার অভিজ্ঞতা',
    fields: [
      { id: 'primaryLanguage', label: 'প্রধান ভাষা', type: 'select', options: languageOptions },
      { id: 'writingTone', label: 'লেখার ধরন', type: 'select', options: toneOptions },
      { id: 'terminologyRule', label: 'প্রযুক্তিগত শব্দ ব্যবহারের নিয়ম', type: 'textarea' },
      { id: 'bannedWords', label: 'যে শব্দ ব্যবহার করা যাবে না', type: 'textarea' },
      { id: 'requiredPhrases', label: 'যে বাক্য বা ভাষা অবশ্যই রাখতে হবে', type: 'textarea' },
    ],
  },
  {
    title: 'ব্যবহারকারী ও শেখার পথ',
    fields: [
      { id: 'targetUsers', label: 'লক্ষ্য ব্যবহারকারী কারা', type: 'textarea' },
      { id: 'mainUseCase', label: 'প্রধান ব্যবহার পরিস্থিতি', type: 'textarea' },
      { id: 'userProblem', label: 'ব্যবহারকারীর সমস্যা', type: 'textarea' },
      { id: 'primaryPath', label: 'প্রধান ব্যবহার পথ', type: 'select', options: pathLabelOptions },
      { id: 'alternativePath', label: 'বিকল্প ব্যবহার পথ', type: 'textarea' },
    ],
  },
  {
    title: 'ব্র্যান্ডিং ও ভিজ্যুয়াল',
    fields: [
      { id: 'logoStatus', label: 'লোগো আছে কি না', type: 'input' },
      { id: 'primaryColor', label: 'প্রধান রং', type: 'input' },
      { id: 'secondaryColor', label: 'দ্বিতীয় রং', type: 'input' },
      { id: 'accentColor', label: 'অ্যাকসেন্ট রং', type: 'input' },
      { id: 'imageStatus', label: 'ছবি আছে কি না', type: 'input' },
      { id: 'visualRestrictions', label: 'কোন ভিজ্যুয়াল restriction আছে কি না', type: 'textarea' },
      { id: 'designPreference', label: 'ডিজাইন পছন্দ', type: 'select', options: designPreferenceOptions },
    ],
  },
  {
    title: 'বিশ্বাস, নিরাপত্তা ও সীমাবদ্ধতা',
    fields: [
      { id: 'disallowedData', label: 'কোন তথ্য ব্যবহার করা যাবে না', type: 'textarea' },
      { id: 'disallowedAnswers', label: 'কোন উত্তর দেওয়া যাবে না', type: 'textarea' },
      { id: 'humanHelpTrigger', label: 'মানুষের সাহায্য কখন লাগবে', type: 'textarea' },
      { id: 'privacyNote', label: 'গোপনীয়তা নোট', type: 'textarea' },
      { id: 'legalLimitations', label: 'আইনি বা সংবেদনশীল সীমাবদ্ধতা', type: 'textarea' },
      { id: 'approvalNeed', label: 'ক্লায়েন্ট অনুমোদনের প্রয়োজন আছে কি না', type: 'input' },
    ],
  },
  {
    title: 'অতিরিক্ত নোট',
    fields: [
      { id: 'extraRequests', label: 'ক্লায়েন্টের অতিরিক্ত অনুরোধ', type: 'textarea' },
      { id: 'deadline', label: 'ডেডলাইন', type: 'input' },
      { id: 'firstDemo', label: 'প্রথম ডেমোতে কী দেখাতে হবে', type: 'textarea' },
      { id: 'postponedItems', label: 'কোন বিষয় পরে রাখা হবে', type: 'textarea' },
      { id: 'otherNotes', label: 'অন্যান্য নোট', type: 'textarea' },
    ],
  },
];
