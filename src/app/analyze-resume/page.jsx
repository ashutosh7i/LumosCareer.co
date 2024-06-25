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
import { Textarea } from "@/components/ui/textarea";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import axios from "axios";
import ReactSpeedometer from "react-d3-speedometer";
import { getDocument, updateDocument, uploadResume } from "@/lib/appwrite";
import { Badge } from "@/components/ui/badge";
import { ProtectedRoute } from "@/lib/ProtectedRoute"; // Adjust the import path as needed
import { useAuth } from "@/lib/AuthContext";
import Loading from "@/components/Loading/Loading";

export default function Component() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("input");
  const [userInput, setUserInput] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [jd, setJd] = useState("");
  const [output, setOutput] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false); // Added loading state
  const { toast } = useToast();

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
  // setting jd from user data
  useEffect(() => {
    if (user) {
      setJd(user.user_jd);
    }
  }, [user, jd]);

  if (!user) {
    return <Loading />;
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== "application/pdf") {
        toast({
          title: "Invalid File Type ❌",
          description: "Please upload a PDF file.",
        });
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large ❌",
          description: "File size should be less than 5 MB.",
        });
        return;
      }

      setResumeFile(file);
    }
  };

  const parsePercentage = (percentageString) => {
    if (!percentageString) return 0;
    const numericPart = percentageString.replace("%", "");
    return parseFloat(numericPart);
  };

  const analyzeResume = async (e) => {
    e.preventDefault();
    toast({
      title: "Analyzing Resume 📡",
      description: "Please wait while we process the data",
    });

    if (!resumeFile) {
      toast({
        title: "Error ❌",
        description: "Please provide your resume.",
      });
      return;
    }

    setLoading(true); // Start loading

    const formData = new FormData();
    formData.append("job_description", jd);
    formData.append("resume", resumeFile);

    try {
      const response = await axios.post(
        "https://backend.lumoscareer.co/analyze",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = response.data;

      // Update state with analysis result
      setAnalysisResult(data);
      setActiveTab("output");

      // Display success toast
      toast({
        title: "Analysis Complete ✅✨",
        description: "Your resume has been analyzed successfully.",
      });

      // Automatically save the analysis result to the database
      await handleSave(data);
      // Upload the resume to the bucket
      await handleUpload();
    } catch (error) {
      toast({
        title: "Error ❌",
        description:
          "An error occurred while analyzing the resume. Please try again later.",
      });
    } finally {
      setLoading(false); // End loading
    }
  };

  //  Save the analysis result to the database
  const handleSave = async (analysisData) => {
    let analysisDataString = JSON.stringify(analysisData);
    try {
      await updateDocument(undefined, analysisDataString, undefined, undefined);
      toast({
        title: "Save Successful ✅",
        description: "Resume analysis has been saved successfully!",
      });
    } catch (error) {
      toast({
        title: "Save Failed ❌",
        description: "Failed to save resume analysis: " + error.message,
      });
    }
  };

  // upload user's resume to bucket
  const handleUpload = async () => {
    try {
      await uploadResume(resumeFile);
      toast({
        title: "Upload Successful ✅",
        description: "Your resume has been uploaded successfully!",
      });
    } catch (error) {
      toast({
        title: "Upload Failed ❌",
        description: "Failed to upload resume: " + error.message,
      });
    }
  };

  const handlePrintCard = () => {
    const printWindow = window.open("", "_blank");
    const cardHTML = document.getElementById("resume-analyzer-card").outerHTML;
    printWindow.document.write(
      "<html><head><title>Resume Analyzer</title></head><body>"
    );
    printWindow.document.write(cardHTML);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <ProtectedRoute>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full max-w-3xl mx-auto"
      >
        <TabsList className="grid gap-2">
          <TabsTrigger value="input">Input</TabsTrigger>
        </TabsList>
        <TabsContent value="input">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Resume Analyzer📜</CardTitle>
                  <CardDescription>
                    Analyze your resume and get a summary of it.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <div className="grid w-full max-w-sm items-center gap-2">
                  <Label htmlFor="resume">Upload PDF</Label>
                  <Input
                    required
                    id="resume"
                    type="file"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <CardFooter className="sticky bottom-0 bg-white dark:bg-gray-950 py-4 flex justify-center">
                <Button type="submit" onClick={analyzeResume}>
                  Analyze📃
                </Button>
              </CardFooter>
            </CardContent>
          </Card>
          <TabsList className="grid gap-2">
            <TabsTrigger value="output">Output</TabsTrigger>
          </TabsList>
        </TabsContent>
        <TabsContent value="output">
          <Card id="resume-analyzer-card">
            <CardHeader>
              <div className="">
                <div className="">
                  <CardTitle>Resume Analyzer📜</CardTitle>
                  <CardDescription>
                    This is the summary of your resume.
                  </CardDescription>

                  {/* Speedometer */}
                  {analysisResult && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                      className="mb-4"
                    >
                      <div style={{ width: "250px", height: "150px" }}>
                        <ReactSpeedometer
                          fluidWidth={true}
                          minValue={0}
                          maxValue={100}
                          value={parsePercentage(analysisResult["JD Match"])}
                          needleColor="steelblue"
                          needleHeightRatio={0.7}
                          customSegmentLabels={[
                            {
                              text: "😵",
                              position: "INSIDE",
                              color: "#555",
                              fontSize: "19px",
                            },
                            {
                              text: "😞",
                              position: "INSIDE",
                              color: "#555",
                              fontSize: "19px",
                            },
                            {
                              text: "😐",
                              position: "INSIDE",
                              color: "#555",
                              fontSize: "19px",
                            },
                            {
                              text: "😄",
                              position: "INSIDE",
                              color: "#555",
                              fontSize: "19px",
                            },
                            {
                              text: "😉",
                              position: "INSIDE",
                              color: "#555",
                              fontSize: "19px",
                            },
                          ]}
                        />
                      </div>
                      <p className="text-lg font-medium">JD match score</p>
                    </div>
                  )}

                  {/* Summary div */}
                  {analysisResult && (
                    <div className="space-y-4 mb-4">
                      {analysisResult["Profile Summary"] && (
                        <div>
                          <h3 className="text-lg font-medium">
                            Profile Summary
                          </h3>
                          <p className="text-sm">
                            {analysisResult["Profile Summary"]}
                          </p>
                        </div>
                      )}

                      {analysisResult["ThingsToBeRemoved"].length > 0 && (
                        <div>
                          <h3 className="text-lg font-medium">
                            Things to be Removed
                          </h3>
                          <p className="text-sm">
                            {analysisResult["ThingsToBeRemoved"].join(", ")}
                          </p>
                        </div>
                      )}

                      {analysisResult["ThingsToBeAdded"].length > 0 && (
                        <div>
                          <h3 className="text-lg font-medium">
                            Things to be Added
                          </h3>
                          <p className="text-sm">
                            {analysisResult["ThingsToBeAdded"].join(", ")}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Result div */}
                {analysisResult && (
                  <div>
                    {analysisResult["ATS Friendliness"] && (
                      <div className="mb-4">
                        <h3 className="text-lg font-medium">
                          ATS Friendliness
                        </h3>
                        <p className="text-sm">
                          {analysisResult["ATS Friendliness"]}
                        </p>
                      </div>
                    )}

                    {analysisResult["MissingKeywords"].length > 0 && (
                      <div>
                        <h3 className="text-lg font-medium">
                          Missing Keywords
                        </h3>
                        <div className="flex flex-wrap">
                          {analysisResult["MissingKeywords"].map(
                            (keyword, index) => (
                              <div key={index} className="mr-4 mb-2">
                                <Badge variant="secondary">{keyword}</Badge>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent className="pt-2"></CardContent>

            <CardFooter className="sticky bottom-0 bg-white dark:bg-gray-950 py-4 lg:py-0">
              <Button
                variant={"outline"}
                className="mr-4"
                onClick={handlePrintCard}
              >
                Download
                <Download className="ml-2 h-4 w-4" />
              </Button>
              <Button type="submit" disabled={loading}>
                <Link href={loading ? "#" : "/generate-resume"}>
                  Generate resume🪄✨
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </ProtectedRoute>
  );
}
