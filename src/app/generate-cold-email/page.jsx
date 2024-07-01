"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Download, Mail, MailIcon, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import axios from "axios";
import { getDocument, updateDocument, getResume } from "@/lib/appwrite";
import { useRouter } from "next/navigation";
import Editor from "@/components/Editor";
import "./loader.css";
import Image from "next/image";

export default function Component() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("input");
  const [userInput, setUserInput] = useState("");
  const [output, setOutput] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const { toast } = useToast();

  const [showJDBadge, setShowJDBadge] = useState(false);
  const [showResumeBadge, setShowResumeBadge] = useState(false);
  const [showResumeAnalysisBadge, setShowResumeAnalysisBadge] = useState(false);

  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [portfolio, setPortfolio] = useState("");

  const [userAdditionalInfo, setUserAdditionalInfo] = useState("");

  const [resumeUrl, setResumeUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const content = `
 <center><h1>Getting ready</h1></center>
`;

  // Fetch the user's data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getDocument();
        setUser(user);
      } catch (error) {
        alert("Failed to fetch user data: " + error.message);
      }
    };
    fetchData();
  }, []);

  //setting the badges ,socials and additional info
  useEffect(() => {
    // console.log(user);
    if (user) {
      if (user.user_jd) {
        setShowJDBadge(true);
      }
      if (user.user_resume) {
        // if user_resume is present, then it means the resume is available in storage
        // so we can get it from the storage
        getResume()
          .then((resumeurl) => {
            setResumeUrl(resumeurl);
            setShowResumeBadge(true);
          })
          .catch((error) => {
            console.error(error);
          });
      }
      if (user.resume_report) {
        setShowResumeAnalysisBadge(true);
      }
      if (user.user_socials) {
        setLinkedin(user.user_socials[0]);
        setGithub(user.user_socials[1]);
        setPortfolio(user.user_socials[2]);
      }
      if (user.user_additional_info) {
        setUserAdditionalInfo(user.user_additional_info);
      }
    }
  }, [user]);
  const handleSave = async () => {
    const userSocials = [linkedin, github, portfolio];
    try {
      await updateDocument(undefined, undefined, userSocials, undefined);
      toast({
        title: "Social Linked Saved ✅",
        description: "Social links saved successfully!",
      });
    } catch (error) {
      toast({
        title: "Error ❌",
        description: "Failed to save links " + error.message,
      });
    }
  };

  const generateColdEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    //setting all data to be sent in state as json
    const userData = {
      user_jd: user.user_jd,
      user_resume: resumeUrl,
      resume_report: user.resume_report,
      user_socials: [linkedin, github, portfolio],
      user_additional_info: userAdditionalInfo,
      // template
    };

    setUserInput(userData);

    toast({
      title: "Calling API 📡",
      description: "Please wait while we process the data",
    });

    try {
      // Download the file
      const responseFile = await axios.get(resumeUrl, { responseType: "blob" });
      const file = new File([responseFile.data], "resume.pdf", {
        type: "application/pdf",
      });

      // Create form data
      const formData = new FormData();
      formData.append("job_description", user.user_jd);
      formData.append("resume", file);

      // Send the request
      const response = await axios.post(
        "https://backend.lumoscareer.co/coldemail",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = response.data; // The response is already a JSON
      setIsLoading(false);
      // console.log(data);
      toast({
        title: "Response Ready ✅✨",
        description: "Data has been fetched successfully.",
      });
      setOutput(JSON.stringify(data.cold_email.replace(/\n/g, ""))); // Now you can access cold_email
      setActiveTab("output");
    } catch (error) {
      toast({
        title: "Error ❌",
        description:
          "An error occurred while fetching data. Please try again later.",
      });
      setIsLoading(false);
    }
  };
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(
      "<html><head><title>Job Description</title></head><body>"
    );
    printWindow.document.write(output);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  function htmlToPlainText(html) {
    // Create a temporary DOM element to hold the HTML content
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;

    // Replace common HTML tags with plain text equivalents
    const replaceTags = (node) => {
      // Handle specific tags
      switch (node.nodeName.toLowerCase()) {
        case "br":
          return "\n";
        case "p":
          return node.textContent + "\n\n";
        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6":
          return node.textContent + "\n";
        case "li":
          return "* " + node.textContent + "\n";
        case "ul":
        case "ol":
          return node.innerHTML.replace(/<li>/g, "\n* ").replace(/<\/li>/g, "");
        case "a":
          return node.textContent + " (" + node.href + ")";
        default:
          return node.textContent;
      }
    };

    // Traverse the DOM tree and replace tags with plain text equivalents
    const traverseNodes = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent;
      }
      if (node.nodeType === Node.ELEMENT_NODE) {
        let plainText = "";
        node.childNodes.forEach((childNode) => {
          plainText += traverseNodes(childNode);
        });
        return replaceTags(node) || plainText;
      }
      return "";
    };

    return traverseNodes(tempElement).replace(/\n+/g, "\n").trim();
  }

  // Example usage:
  // const htmlContent = `<center><h1>Getting ready</h1></center><p>This is a test email.<br>Please review the content.</p>`;
  // const plainTextContent = htmlToPlainText(htmlContent);
  // console.log(plainTextContent);

  const sendMail = () => {
    const recipient = "example@example.com"; // Set the recipient's email address
    const subject = encodeURIComponent("Email Subject Here"); // URL encode the subject
    const plainTextBody = htmlToPlainText(output); // Convert HTML to plain text
    const body = encodeURIComponent(plainTextBody); // URL encode the body content

    // Construct the mailto link
    const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${body}`;

    // Open the default email client
    window.location.href = mailtoLink;
  };

  return (
    <>
      {isLoading && (
        <Dialog open defaultOpen>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Processing</DialogTitle>
              <DialogDescription>
                Your cold email is being generated. Please wait.
              </DialogDescription>
            </DialogHeader>
            <div className="loader-container">
              {/* <div className="loader"></div> */}
              <div>
                <svg class="pl" width="240" height="240" viewBox="0 0 240 240">
                  <circle
                    className="pl__ring pl__ring--a"
                    cx="120"
                    cy="120"
                    r="105"
                    fill="none"
                    stroke="#000"
                    stroke-width="20"
                    stroke-dasharray="0 660"
                    stroke-dashoffset="-330"
                    stroke-linecap="round"
                  ></circle>
                  <circle
                    className="pl__ring pl__ring--b"
                    cx="120"
                    cy="120"
                    r="35"
                    fill="none"
                    stroke="#000"
                    stroke-width="20"
                    stroke-dasharray="0 220"
                    stroke-dashoffset="-110"
                    stroke-linecap="round"
                  ></circle>
                  <circle
                    className="pl__ring pl__ring--c"
                    cx="85"
                    cy="120"
                    r="70"
                    fill="none"
                    stroke="#000"
                    stroke-width="20"
                    stroke-dasharray="0 440"
                    stroke-linecap="round"
                  ></circle>
                  <circle
                    className="pl__ring pl__ring--d"
                    cx="155"
                    cy="120"
                    r="70"
                    fill="none"
                    stroke="#000"
                    stroke-width="20"
                    stroke-dasharray="0 440"
                    stroke-linecap="round"
                  ></circle>
                </svg>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      <div className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Generate cold email 📧</CardTitle>
              <CardDescription>
                generate a cold email based on your JD and resume
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="">
          <TabsList className="grid gap-2">
            <TabsTrigger value="input">Input</TabsTrigger>
          </TabsList>
          <TabsContent value="input">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Input checklist</CardTitle>
                    <CardDescription>
                      we generate cold email using your previously fed data
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <div className="px-4 md:px-6">
                {/* Mobile view */}
                <div className="grid grid-cols-1 gap-4 md:hidden">
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* JD section */}
                      <Card className="rounded-lg border w-full">
                        <CardContent className="flex items-center justify-between p-6">
                          <div className="flex items-center gap-5">
                            <Checkbox
                              id="resume"
                              defaultChecked
                              className="mr-2"
                            />
                            <Label htmlFor="resume">JD</Label>
                          </div>
                          {showJDBadge ? (
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className="py-1 rounded-full"
                              >
                                parsed
                              </Badge>
                              <Button
                                onClick={() => router.push("/get-started")}
                                variant="outline"
                                size="sm"
                              >
                                update
                              </Button>
                            </div>
                          ) : (
                            <Button
                              onClick={() => router.push("/get-started")}
                              variant="outline"
                              size="sm"
                            >
                              add
                            </Button>
                          )}
                        </CardContent>
                      </Card>

                      {/* Resume Section */}
                      <Card className="rounded-lg border w-full">
                        <CardContent className="flex items-center justify-between p-6">
                          <div className="flex items-center gap-5">
                            <Checkbox
                              id="resume"
                              defaultChecked
                              className="mr-2"
                            />
                            <Label htmlFor="resume">Your Resume</Label>
                          </div>
                          {showResumeBadge ? (
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className="py-1 rounded-full"
                              >
                                parsed
                              </Badge>
                              <Button
                                onClick={() => router.push("/analyze-resume")}
                                variant="outline"
                                size="sm"
                              >
                                update
                              </Button>
                            </div>
                          ) : (
                            <Button
                              onClick={() => router.push("/analyze-resume")}
                              variant="outline"
                              size="sm"
                            >
                              add
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </div>
                {/* Desktop view */}
                <div className="hidden md:block">
                  <CardContent>
                    <div className="grid grid-cols-2 grid-rows-1 gap-4">
                      {/* JD section */}
                      <Card className="rounded-lg border w-full max-w-md">
                        <CardContent className="flex items-center justify-between p-6">
                          <div className="flex items-center gap-5">
                            <Checkbox
                              id="resume"
                              defaultChecked
                              className="mr-2"
                            />
                            <Label htmlFor="resume">JD</Label>
                          </div>
                          {showJDBadge ? (
                            <div>
                              <Badge
                                variant="outline"
                                className="py-1 rounded-full"
                              >
                                parsed
                              </Badge>
                              <Button
                                onClick={() => {
                                  router.push("/get-started");
                                }}
                                variant="outline"
                                size={"sm"}
                              >
                                update
                              </Button>
                            </div>
                          ) : (
                            <Button
                              onClick={() => {
                                router.push("/get-started");
                              }}
                              variant="outline"
                              size={"sm"}
                            >
                              add
                            </Button>
                          )}
                        </CardContent>
                      </Card>

                      {/* Resume Section */}
                      <Card className="rounded-lg border w-full max-w-md">
                        <CardContent className="flex items-center justify-between p-6">
                          <div className="flex items-center gap-5">
                            <Checkbox
                              id="resume"
                              defaultChecked
                              className="mr-2"
                            />
                            <Label htmlFor="resume">Your Resume</Label>
                          </div>
                          {showResumeBadge ? (
                            <div>
                              <Badge
                                variant="outline"
                                className="py-1 rounded-full"
                              >
                                parsed
                              </Badge>
                              <Button
                                onClick={() => {
                                  router.push("/analyze-resume");
                                }}
                                variant="outline"
                                size={"sm"}
                              >
                                update
                              </Button>
                            </div>
                          ) : (
                            <Button
                              onClick={() => {
                                router.push("/analyze-resume");
                              }}
                              variant="outline"
                              size={"sm"}
                            >
                              add
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </div>
              </div>
              <CardFooter className="sticky bottom-0 bg-white dark:bg-gray-950 py-4 flex justify-center">
                <Button type="submit" onClick={generateColdEmail}>
                  Generate cold email🪄✨
                </Button>
              </CardFooter>
            </Card>
            <TabsList className="grid gap-2">
              <TabsTrigger value="output">Output</TabsTrigger>
            </TabsList>
          </TabsContent>
          <TabsContent value="output">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Cold email generated 📧</CardTitle>
                    <CardDescription>
                      {"Here's your cold email based on your JD and resume"}
                    </CardDescription>
                  </div>
                  <div className="flex items-center">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="picture">do you like it?</Label>
                      <Button size={"sm"} onClick={generateColdEmail}>
                        Generate again 🔂
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <Editor
                  content={output
                    .replace(/\n/g, "")
                    .replace(/"```html|```"/g, "")
                    .replace(/"/g, " ")}
                />
                {/* <div className="prose">{output}</div> */}
              </CardContent>
              <CardFooter className="sticky bottom-0 bg-white dark:bg-gray-950 py-4 flex flex-col sm:flex-row justify-between">
                <div className="flex flex-row mb-4 sm:mb-0">
                  <Button type="submit" className="mr-4" onClick={sendMail}>
                    Send Email
                    <MailIcon className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant={"outline"}
                    className="mr-4"
                    onClick={handlePrint}
                  >
                    Download
                    <Download className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <Button type="submit">
                  <Link href={"/generate-questions"}>Interview Prep 😉❓</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
