import sanitizer from "sanitize-html";
import { myCV } from "./constants";

type FunctionNames = "get_job_post_details" | "write_cover_letter_for_me";

interface ArgumentsType {
  [key: string]: string;
}

async function getJobPostDetails(args: ArgumentsType) {
  try {
    const url = args.url;
    const html = await fetch(url).then((res) => res.text());

    let clean = sanitizer(html, {
      allowedTags: ["div", "p", "strong", "ul", "li"],
      allowedAttributes: false,
      allowedClasses: {
        div: ["description__text"],
      },
    });

    const regex = /<div[^>]*class="description__text"[^>]*>(.*?)<\/div>/s;
    const match = clean.match(regex);

    if (match && match[1]) {
      const innerContent = match[1];
      return innerContent.trim();
    }

    return "";
  } catch (error) {
    console.log(error);
    return "";
  }
}

async function writeCoverLetter(args: ArgumentsType) {
  try {
    const jobDetails = await getJobPostDetails(args);

    return {
      job_details: jobDetails,
      cv_details: myCV,
    };
  } catch (error) {
    console.log(error);
    return {
      job_details: "",
      cv_details: "",
    };
  }
}

export const functions = [
  {
    name: "get_job_post_details",
    description:
      "Get Linkedin job post details from the given URL. Output is the string of the job post details.",
    parameters: {
      type: "object",
      properties: {
        url: {
          type: "string",
          description:
            "The URL of the job post from Linkedin to be fetched. For example: https://www.linkedin.com/jobs/view/1234567890",
        },
      },
      required: ["url"],
    },
  },
  {
    name: "write_cover_letter_for_me",
    description:
      "Write cover letter from the given URL and using my CV for the cover letter. Output is the object content details of the job post and user's CV used to write cover letter.",
    parameters: {
      type: "object",
      properties: {
        url: {
          type: "string",
          description:
            "The URL of the job post from Linkedin to be fetched. For example: https://www.linkedin.com/jobs/view/1234567890",
        },
      },
      required: ["url"],
    },
  },
];

export async function runFunction(name: FunctionNames, args: string) {
  const jsonArgs = JSON.parse(args);

  switch (name) {
    case "get_job_post_details":
      return await getJobPostDetails(jsonArgs);
    case "write_cover_letter_for_me":
      return await writeCoverLetter(jsonArgs);

    default:
      throw new Error("Function not found");
  }
}
