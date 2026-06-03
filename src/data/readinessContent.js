export const readinessStorageKey = 'ai-integrator-bangla-lab-readiness';

export const readinessIntro = {
  title: 'প্রস্তুতি যাচাই',
  subtitle: 'আপনি এখন কোন ধাপে আছেন তা যাচাই করুন',
  description:
    'এই ড্যাশবোর্ডটি আপনার শেখার অগ্রগতি বুঝতে সাহায্য করবে। এটি কোনো সার্টিফিকেট নয় এবং কোনো চাকরি, ক্লায়েন্ট বা আয়ের নিশ্চয়তা দেয় না।',
  privacyNote:
    'আপনার অগ্রগতি শুধু এই ব্রাউজারে সংরক্ষিত থাকবে। কোনো লগইন, ডাটাবেস বা ব্যক্তিগত তথ্য পাঠানো হবে না।',
};

export const readinessChecklistGroups = [
  {
    id: 'concepts',
    title: 'ধারণা',
    items: [
      { id: 'concept-ai-integrator-role', label: 'আমি বুঝি এআই ইন্টিগ্রেটর কী কাজ করে' },
      { id: 'concept-business-ai-need', label: 'আমি বুঝি ব্যবসা কেন এআই যুক্ত করতে চায়' },
      { id: 'concept-business-problem', label: 'আমি একটি ছোট ব্যবসার সমস্যা চিহ্নিত করতে পারি' },
    ],
  },
  {
    id: 'practice',
    title: 'অনুশীলন',
    items: [
      { id: 'practice-custom-gpt-plan', label: 'আমি একটি কাস্টম জিপিটি পরিকল্পনা করেছি' },
      { id: 'practice-assistant-instructions', label: 'আমি একটি সহকারীর নির্দেশনা লিখেছি' },
      { id: 'practice-knowledge-base-draft', label: 'আমি একটি নলেজ বেসের খসড়া তৈরি করেছি' },
    ],
  },
  {
    id: 'tech-concepts',
    title: 'প্রযুক্তি ধারণা',
    items: [
      { id: 'tech-api-basics', label: 'আমি এপিআই কী তা প্রাথমিকভাবে বুঝি' },
      { id: 'tech-json-request-response', label: 'আমি জেসন এবং রিকোয়েস্ট রেসপন্স ধারণা বুঝি' },
      { id: 'tech-python-small-task', label: 'আমি পাইথন দিয়ে ছোট কাজের পরিকল্পনা করতে পারি' },
    ],
  },
  {
    id: 'project',
    title: 'প্রজেক্ট',
    items: [
      { id: 'project-brief', label: 'আমি একটি ছোট প্রজেক্ট ব্রিফ লিখেছি' },
      { id: 'project-demo-screenshot-plan', label: 'আমি ডেমোর জন্য স্ক্রিনশট পরিকল্পনা করেছি' },
      { id: 'project-github-readme-draft', label: 'আমি গিটহাব রিডমির খসড়া তৈরি করেছি' },
    ],
  },
  {
    id: 'portfolio',
    title: 'পোর্টফোলিও',
    items: [
      { id: 'portfolio-problem-solution', label: 'আমি আমার কাজের সমস্যা ও সমাধান ব্যাখ্যা করতে পারি' },
      { id: 'portfolio-demo-script', label: 'আমি একটি সংক্ষিপ্ত ডেমো স্ক্রিপ্ট লিখেছি' },
      { id: 'portfolio-service-proposal', label: 'আমি একটি ছোট সার্ভিস প্রস্তাবনার খসড়া তৈরি করেছি' },
    ],
  },
];

export const readinessLevels = [
  {
    min: 0,
    max: 3,
    level: 'ভিত্তি শুরু করুন',
    message:
      'আপনার শেখার যাত্রা শুরু হয়েছে। আগে এআই ইন্টিগ্রেটর ধারণা, শেখার রোডম্যাপ এবং প্রথম কয়েকটি ভিডিও ভালোভাবে দেখুন।',
    nextSteps: [
      'ভিডিও ১ এবং ভিডিও ২ আবার দেখুন',
      'একটি ছোট ব্যবসার সমস্যা লিখুন',
      'নিজের ৩০ দিনের শেখার পরিকল্পনা তৈরি করুন',
    ],
  },
  {
    min: 4,
    max: 6,
    level: 'ভিত্তি প্রস্তুত',
    message: 'আপনি মূল ধারণা ধরতে শুরু করেছেন। এখন হাতে কলমে ছোট অনুশীলনে যাওয়ার সময়।',
    nextSteps: [
      'একটি কাস্টম জিপিটি পরিকল্পনা করুন',
      'সহকারীর কাজ ও সীমা লিখুন',
      'একটি ছোট নলেজ বেস খসড়া তৈরি করুন',
    ],
  },
  {
    min: 7,
    max: 10,
    level: 'অনুশীলন প্রস্তুত',
    message: 'আপনার ভিত্তি ভালো হচ্ছে। এখন ছোট প্রজেক্টের দিকে এগোনো উচিত।',
    nextSteps: [
      'একটি প্রজেক্ট ব্রিফ লিখুন',
      'এপিআই বা পাইথন ধারণার ব্যবহারিক প্রবাহ আঁকুন',
      'ডেমোর জন্য স্ক্রিনশট পরিকল্পনা করুন',
    ],
  },
  {
    min: 11,
    max: 13,
    level: 'প্রজেক্ট প্রস্তুত',
    message: 'আপনি ছোট প্রজেক্ট সাজানোর পর্যায়ে পৌঁছেছেন। এখন কাজকে প্রকাশযোগ্য প্রমাণে রূপ দিন।',
    nextSteps: [
      'গিটহাব রিডমির খসড়া তৈরি করুন',
      'ডেমো স্ক্রিপ্ট লিখুন',
      'প্রজেক্টের সমস্যা, সমাধান এবং ফলাফল সাজান',
    ],
  },
  {
    min: 14,
    max: 15,
    level: 'পোর্টফোলিও প্রস্তুত',
    message:
      'আপনার প্রস্তুতি শক্তিশালী। এখন কাজগুলো পরিষ্কারভাবে দেখানোর মতো করে সাজান এবং পরবর্তী অনুশীলনের পরিকল্পনা করুন।',
    nextSteps: [
      'পোর্টফোলিও সারাংশ লিখুন',
      'একটি ছোট সার্ভিস প্রস্তাবনার খসড়া তৈরি করুন',
      'পরবর্তী প্রজেক্টের জন্য অনুশীলন ব্রিফ তৈরি করুন',
    ],
  },
];

export const readinessTotalItems = readinessChecklistGroups.reduce(
  (total, group) => total + group.items.length,
  0,
);

export function getReadinessLevel(score) {
  return readinessLevels.find((item) => score >= item.min && score <= item.max) ?? readinessLevels[0];
}
