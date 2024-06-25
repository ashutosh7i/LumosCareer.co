"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createDocument, getDocuments } from "@/lib/appwrite";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { ProtectedRoute } from "@/lib/ProtectedRoute";
import Loading from "@/components/Loading/Loading";

export default function Component() {
  const { toast } = useToast();
  const [jobName, setJobName] = useState("");
  const [documents, setDocuments] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getDocuments().then((docs) => {
      setDocuments(docs.documents);
    });
  }, []);

  const { user } = useAuth();

  if (!user) {
    return <Loading />;
  }

  function handleOpen(docId) {
    localStorage.setItem("documentId", docId);
    router.push("/get-started");
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formattedJobName = jobName.replace(/\s/g, "-");
    toast({
      title: "Creating new application⌛",
      description: `Using formatted job name: ${formattedJobName}`,
    });
    createDocument(formattedJobName)
      .then((document) => {
        toast({
          title: "Created application✅",
          description: `It goes by ${document.$id}`,
        });
        handleOpen(document.$id);
      })
      .catch((error) => {
        if (
          error.message ===
          "Document with the requested ID already exists. Try again with a different ID or use ID.unique() to generate a unique ID."
        ) {
          toast({
            title: "Job already exists🛠️",
            description: "Please try creating with a different name",
          });
        } else {
          toast({
            title: "Error",
            description: error.message,
          });
        }
      });
  }

  return (
    <ProtectedRoute>
      <div className="w-full">
        <header className="flex items-center justify-between px-8 py-3 md:px-6 md:py-4">
          <div className="flex items-end space-x-2">
            <h2 className="text-lg">welcome</h2>
            <h1 className="text-xl font-bold">{user.name.split("_")[0]}👋!</h1>
          </div>
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button>➕ new</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg p-4">
                <DialogHeader>
                  <DialogTitle>Create an Item</DialogTitle>
                  <DialogDescription>
                    We identify applications by job name. Create something
                    unique like <br />
                    <code>fullstack-dev-google</code>
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      onChange={(e) => setJobName(e.target.value)}
                      placeholder="e.g., swe-at-google"
                      className="col-span-3"
                    />
                  </div>
                  <DialogFooter className="flex justify-end mt-4">
                    <Button type="submit">Create</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </header>
        {/* // mobile view */}
        <div className="px-4 md:px-6">
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {documents.map((doc, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <h3 className="text-lg font-medium">{doc.$id}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm text-muted-foreground">
                      {doc.$tenant}
                    </p>
                    <Button
                      variant={"outline"}
                      onClick={() => handleOpen(doc.$id)}
                    >
                      Open
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {new Date(doc.$updatedAt).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="hidden md:block lg:block px-6 border ">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc, index) => (
                  <TableRow key={index}>
                    <TableCell>{doc.$id}</TableCell>
                    <TableCell> {doc.$tenant}</TableCell>
                    <TableCell>
                      {new Date(doc.$updatedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant={"secondary"}
                        onClick={() => handleOpen(doc.$id)}
                      >
                        Open
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
