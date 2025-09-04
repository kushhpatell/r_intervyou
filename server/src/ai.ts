import { InterviewSession } from './models.js';

export interface GenerateQuestionsInput {
	userId: string;
	type: string; // behavioral/technical/leadership
	role: string;
	level: string; // junior/mid/senior
	count: number;
}

// Free question templates - no API calls needed
const questionTemplates = {
	behavioral: {
		entry: [
			"Tell me about a time when you had to learn a new skill quickly. How did you approach it?",
			"Describe a situation where you had to work with someone difficult. How did you handle it?",
			"Can you share an example of when you went above and beyond what was expected?",
			"What's a challenge you faced in your previous role and how did you overcome it?",
			"Tell me about a time when you had to make a decision without all the information you needed.",
			"Give an example of when you received constructive criticism and how you responded.",
			"Describe a time when you managed a tight deadline and what you did to succeed.",
			"Share an instance when you had to adapt to significant change at work.",
			"Tell me about a time when you had to solve a conflict between coworkers.",
			"Describe a time you took initiative to improve a process or outcome.",
			"When have you had to learn from failure? What did you change?",
			"Tell me about a time you had to persuade others to follow your idea.",
			"Describe a moment when you had to keep calm under pressure.",
			"Share an example of delegating a task successfully.",
			"Tell me about a time you balanced multiple priorities and how you organized them.",
			"Describe when you mentored someone and the outcome.",
			"Share a time when you improved customer or stakeholder satisfaction.",
			"Tell me about a time when your ethics were challenged and how you responded.",
			"Describe an occasion when you exceeded a performance metric.",
			"Share a time you learned from feedback and applied it to improve." 
		],
		mid: [
			"Describe a project where you had to lead a team through a difficult situation.",
			"Tell me about a time when you had to implement a major change that wasn't popular.",
			"Can you share an example of when you had to resolve a conflict between team members?",
			"What's a strategic decision you made that had a significant impact on your organization?",
			"Tell me about a time when you had to manage competing priorities and deadlines."
		],
		senior: [
			"Describe a situation where you had to transform an underperforming team into a high-performing one.",
			"Tell me about a time when you had to make a difficult decision that affected the entire company.",
			"Can you share an example of when you had to navigate a major organizational change?",
			"What's a crisis you managed and what was the outcome?",
			"Tell me about a time when you had to influence stakeholders who were resistant to change."
		]
	},
	technical: {
		entry: [
			"How would you explain a complex technical concept to a non-technical person?",
			"Describe a technical problem you solved recently. What was your approach?",
			"What programming languages are you most comfortable with and why?",
			"How do you stay updated with the latest technology trends?",
			"Can you walk me through your debugging process when you encounter an issue?",
			"Describe a time you optimized performance in a system or application.",
			"Tell me about your experience with test automation and CI/CD.",
			"Explain a time you refactored code to improve maintainability.",
			"Describe how you designed a critical component of a system.",
			"How do you approach trade-offs between speed and correctness?",
			"Share a time when you fixed a production incident. What steps did you take?",
			"Describe your approach to ensuring security in an application.",
			"What tools do you use for profiling and why?",
			"Tell me about designing for scalability and load.",
			"How do you manage technical debt in a long-lived project?",
			"Describe an API you designed and the design choices you made.",
			"Share an example of integrating third-party services and challenges faced.",
			"How do you validate assumptions in system design?",
			"Describe a complex algorithm you implemented and why you chose it.",
			"Tell me about a project where you improved reliability or observability."
		],
		mid: [
			"Tell me about a complex system you designed and what challenges you faced.",
			"How do you approach code reviews and what do you look for?",
			"Describe a time when you had to refactor legacy code. What was your strategy?",
			"What's your experience with system architecture and design patterns?",
			"How do you handle technical debt in your projects?"
		],
		senior: [
			"Describe a large-scale system you architected and what made it successful.",
			"Tell me about a time when you had to make a major technical decision that affected multiple teams.",
			"How do you approach technical strategy and roadmap planning?",
			"What's your experience with leading technical transformations?",
			"Can you share an example of when you had to balance technical excellence with business needs?"
		]
	},
	leadership: {
		entry: [
			"Tell me about a time when you had to motivate a team member who was struggling.",
			"Describe a situation where you had to give difficult feedback to someone.",
			"How do you handle situations where team members disagree on an approach?",
			"What's your leadership style and how has it evolved?",
			"Can you share an example of when you had to lead by example?",
			"Describe a time when you set goals for a team and achieved them.",
			"Tell me about delegating responsibilities and measuring success.",
			"How do you develop future leaders on your team?",
			"Describe handling underperformance and the steps you took.",
			"Share a time you aligned teams around a common mission.",
			"Tell me about making a difficult personnel decision and the outcome.",
			"Describe how you built trust across cross-functional teams.",
			"How do you prioritize roadmap decisions with limited resources?",
			"Share an example of successfully navigating a strategic pivot.",
			"Describe a time you handled stakeholder expectations effectively.",
			"How do you measure team health and morale?",
			"Tell me about building culture in a newly-formed team.",
			"Describe leading through ambiguity and what you learned.",
			"Share a time you negotiated conflicting priorities between teams.",
			"How do you balance short-term delivery with long-term vision?"
		],
		mid: [
			"Describe a time when you had to lead a team through a major organizational change.",
			"Tell me about a situation where you had to manage up to senior leadership.",
			"How do you approach building and developing high-performing teams?",
			"What's your experience with strategic planning and execution?",
			"Can you share an example of when you had to make unpopular decisions?"
		],
		senior: [
			"Describe a time when you had to lead a company-wide transformation initiative.",
			"Tell me about a crisis you managed and how you led your organization through it.",
			"How do you approach building a strong organizational culture?",
			"What's your experience with board-level strategic discussions?",
			"Can you share an example of when you had to lead through significant uncertainty?"
		]
	}
	,
	upsc: {
		entry: [
			"Tell us about your background and what motivates you to pursue civil services.",
			"How would you describe the major challenges facing our country today?",
			"What are your views on the role of bureaucracy in development?",
			"Discuss a public policy you think needs urgent reform and why.",
			"How do you handle ethical dilemmas in public service?",
			"What books or thinkers have influenced your worldview and why?",
			"Describe a time you demonstrated leadership in your community.",
			"How would you improve governance at the grassroots level?",
			"What do you think about decentralization of power to states and local bodies?",
			"How would you address unemployment among the youth?",
			"Explain a recent economic policy and its implications for ordinary citizens.",
			"Discuss the importance of sustainable development in policymaking.",
			"How would you prioritize between growth and environmental protection?",
			"What are the challenges in implementing healthcare policies in rural areas?",
			"How do you assess the effectiveness of social welfare schemes?",
			"What steps would you take to improve public education?",
			"Describe an instance where you had to resolve a community conflict.",
			"How do you stay informed about current affairs and public policy?",
			"What role does technology play in improving public services?",
			"How will you balance political directives with administrative neutrality?"
		],
		mid: [
			"How would you approach policy design for rural development in a specific region?",
			"Discuss fiscal federalism and its impact on state finances.",
			"How can digital governance transform citizen services effectively?",
			"Analyse the challenges of implementing large infrastructure projects.",
			"How would you improve the delivery of social security schemes?",
			"Discuss strategies to combat corruption in public administration.",
			"What measures would you recommend to boost agricultural productivity?",
			"How do you assess the trade-offs between subsidization and market reforms?",
			"Explain the role of public-private partnerships in development.",
			"How would you design a program to increase female labour force participation?",
			"Discuss urban planning challenges in fast-growing cities.",
			"What is your approach to crisis management during natural disasters?",
			"How can policy ensure equitable access to healthcare?",
			"Analyse the pros and cons of direct benefit transfers.",
			"What steps would you take to ensure data privacy in government programs?",
			"Discuss the role of skill development in youth employment.",
			"How would you measure the impact of a flagship program?",
			"What reforms would you suggest for public procurement?",
			"How can inter-departmental coordination be improved?",
			"Describe a policy intervention to reduce air pollution in cities."
		],
		senior: [
			"Discuss the long-term strategy for inclusive growth in a developing economy.",
			"How would you balance competing interests of growth, equity, and environment?",
			"What institutional reforms are necessary for better federal governance?",
			"Analyse the implications of global economic changes for domestic policy.",
			"How would you design a national-level disaster response framework?"
		]
	}
};

export async function generateUniqueQuestions(input: GenerateQuestionsInput): Promise<string[]> {
	const { userId, type, level, count } = input;

	// Gather user's previous questions to avoid duplicates
	const past = await InterviewSession.find({ userId }).select('feedback.question').lean();
	const seenQuestions = new Set<string>();
	for (const s of past) {
		for (const f of (s as any).feedback || []) {
			if (f.question) seenQuestions.add(String(f.question).trim());
		}
	}

	// Get appropriate questions based on type and level
	const levelKey = level === 'entry' ? 'entry' : level === 'mid' ? 'mid' : 'senior';
	const availableQuestions = questionTemplates[type as keyof typeof questionTemplates]?.[levelKey as keyof typeof questionTemplates.behavioral] || questionTemplates.behavioral.entry;

	// Filter out questions the user has already seen
	const unusedQuestions = availableQuestions.filter(q => !seenQuestions.has(q));

	// If we don't have enough unused questions, add some generic ones
	if (unusedQuestions.length < count) {
		const genericQuestions = [
				"What are your career goals for the next 3-5 years?",
				"How do you handle stress and pressure in the workplace?",
				"What do you think makes a great team member?",
				"How do you approach continuous learning and development?",
				"What's a recent accomplishment you're proud of?",
				"Describe a time you exceeded expectations.",
				"How do you prioritize competing demands?",
				"What motivates you to do your best work?",
				"Tell me about a professional risk you took and the outcome.",
				"How do you react to ambiguous situations?",
				"What are the most important values you bring to work?",
				"How do you keep yourself accountable?",
				"Describe a time you received unexpected feedback and what you learned.",
				"What do you do to maintain work-life balance?",
				"How do you approach learning new technologies or processes?",
				"Tell me about a time you influenced a decision without authority.",
				"Describe when you had to pivot quickly to meet a business need.",
				"How do you approach mentorship and giving feedback?",
				"What's your process for setting and tracking goals?",
				"Describe an example where collaboration led to better results."
			];
		
		const unusedGeneric = genericQuestions.filter(q => !seenQuestions.has(q));
		unusedQuestions.push(...unusedGeneric);
	}

	// Shuffle and return the requested number of questions
	const shuffled = unusedQuestions.sort(() => Math.random() - 0.5);
	return shuffled.slice(0, count);
}
