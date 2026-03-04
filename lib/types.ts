export type ApplicationStatus =
  | "bookmarked"
  | "applied"
  | "phone_screen"
  | "interview"
  | "offer"
  | "rejected"
  | "ghosted"
  | "withdrawn";

export type TonePreference =
  | "professional"
  | "conversational"
  | "technical"
  | "creative"
  | "formal";

export type GenerationStatus = "pending" | "processing" | "completed" | "failed";

export interface WorkExperience {
  job_title: string;
  company: string;
  start_date: string;
  end_date: string;
  description: string;
  achievements?: string[];
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  details?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
}

export interface Project {
  name: string;
  description: string;
  technologies?: string[];
  url?: string;
}

export interface ApplicantProfile {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  linkedin_url: string;
  location: string;
  portfolio_url: string;
  summary: string;
  target_role: string;
  years_experience: number;
  work_experience: WorkExperience[];
  education: Education[];
  skills: string[];
  certifications: Certification[];
  projects: Project[];
  tone_preference: TonePreference;
  onboarding_completed: boolean;
  resume_raw_text: string | null;
  linkedin_data: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface JDAnalysis {
  job_title: string;
  company_name: string;
  location?: string;
  required_skills: string[];
  preferred_skills: string[];
  years_experience_required?: string;
  key_responsibilities?: string[];
  industry?: string;
  seniority_level?: string;
  posting_tone?: string;
  tools_technologies?: string[];
  salary_range?: string;
  application_instructions?: string;
  [key: string]: unknown;
}

export interface MatchAnalysis {
  match_score: number;
  matched_skills: string[];
  missing_skills: string[];
  transferable_skills?: string[];
  experience_highlights?: string[];
  positioning_strategy?: string;
  talking_points: string[];
  resume_adjustments?: string[];
  keywords_to_include: string[];
  tone_recommendation?: string;
  [key: string]: unknown;
}

export interface GeneratedApplication {
  id: string;
  user_id: string;
  job_title: string;
  company_name: string;
  job_url: string;
  job_description_raw: string;
  jd_analysis: JDAnalysis;
  match_analysis: MatchAnalysis;
  match_score: number;
  cover_letter_text: string;
  tailored_resume_text: string;
  cover_letter_file_path: string;
  resume_file_path: string;
  status: GenerationStatus;
  error_message: string;
  application_status: ApplicationStatus;
  applied_date: string | null;
  notes: string;
  created_at: string;
}

export interface DashboardStats {
  totalApplications: number;
  avgMatchScore: number;
  thisWeek: number;
  interviews: number;
  weeklyApps: number[];
  weeklyScores: number[];
  weeklyInterviews: number[];
}
