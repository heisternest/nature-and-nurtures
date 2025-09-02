"use client";

import { EditorSection } from "@/components/page-builder/editor-section";
import { InputField } from "@/components/page-builder/input-field";
import { RichTextEditor } from "@/components/text-editor/text-editor";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit, Eye, FileText, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { SaveTOS } from "./action";

type TOSData = {
  title: string;
  content: string;
};

const defaultTOS: TOSData = {
  title: "Terms of Service",
  content: "<p>Enter your terms of service content here...</p>",
};

interface TOSDisplayProps {
  data: TOSData;
}

function TOSDisplay({ data }: TOSDisplayProps) {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white min-h-screen">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">{data.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: data.content }} />
      </div>
    </div>
  );
}

export function TOSBuilderForm({ data }: { data?: TOSData | null }) {
  const [tosData, setTosData] = useState<TOSData>(data ?? defaultTOS);
  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const saveTos = async () => {
    setLoading(true);
    const save = await SaveTOS(tosData);
    if (save.success) {
      toast("Successfully saved Terms of Service");
    } else {
      toast("Error saving Terms of Service");
    }
    setLoading(false);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTosData((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleContentChange = (html: string) => {
    setTosData((prev) => ({ ...prev, content: html }));
  };

  return (
    <div className="w-full min-h-screen bg-slate-900 font-sans">
      {/* Editor Panel - Full Width */}
      <div className="w-full p-6 bg-slate-800/50 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
          <div className="flex items-center">
            <Edit className="text-indigo-400" size={24} />
            <h2 className="text-xl font-bold text-white ml-3">
              TOS Page Editor
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
              <DialogTrigger asChild>
                <button className="py-1 px-3 bg-gray-600 hover:bg-gray-500 text-white font-semibold text-sm rounded flex items-center gap-2">
                  <Eye size={16} />
                  Preview
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Terms of Service Preview</DialogTitle>
                </DialogHeader>
                <TOSDisplay data={tosData} />
              </DialogContent>
            </Dialog>
            <button
              onClick={saveTos}
              disabled={loading}
              className="py-1 px-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold disabled:opacity-50 text-sm rounded flex items-center gap-2"
            >
              <Save size={16} />
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EditorSection title="Page Title" icon={<FileText size={16} />}>
            <InputField
              label="Title"
              name="title"
              value={tosData.title}
              onChange={handleTitleChange}
              placeholder="Terms of Service"
            />
          </EditorSection>

          <EditorSection title="Content" icon={<FileText size={16} />}>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white">
                Terms of Service Content
              </label>
              <div className="bg-slate-700 rounded-md p-2">
                <RichTextEditor
                  value={tosData.content}
                  onChange={handleContentChange}
                />
              </div>
            </div>
          </EditorSection>
        </div>
      </div>
    </div>
  );
}
