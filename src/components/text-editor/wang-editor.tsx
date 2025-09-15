"use client";

import { createClient } from "@/utils/supabase/client";
import {
  IDomEditor,
  IEditorConfig,
  IToolbarConfig,
  i18nChangeLanguage,
} from "@wangeditor/editor";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import "@wangeditor/editor/dist/css/style.css";

import React, { useEffect, useState } from "react";

const supabase = createClient();

interface Props {
  value?: string;
  onChange?: (html: string) => void;
}

const RichTextEditor: React.FC<Props> = ({ value = "", onChange }) => {
  const [editor, setEditor] = useState<IDomEditor | null>(null);
  const [html, setHtml] = useState<string>(value);

  useEffect(() => {
    setHtml(value);
  }, [value]);

  const toolbarConfig: Partial<IToolbarConfig> = {};

  const editorConfig: Partial<IEditorConfig> = {
    placeholder: "Type here...",
    onChange(editor: IDomEditor) {
      const html = editor.getHtml();
      setHtml(html);
      onChange?.(html);
    },
    MENU_CONF: {
      uploadImage: {
        async customUpload(file: File, insertFn: (url: string) => void) {
          const fileName = `${Date.now()}-${file.name}`;

          const { error } = await supabase.storage
            .from("ecom")
            .upload(fileName, file);

          if (error) {
            console.error("Upload error:", error.message);
            return;
          }

          const { data: urlData } = supabase.storage
            .from("ecom")
            .getPublicUrl(fileName);

          const publicUrl = urlData?.publicUrl;
          if (publicUrl) {
            insertFn(publicUrl);
          } else {
            console.error("Failed to retrieve public URL");
          }
        },
      },
    },
  };

  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  useEffect(() => {
    i18nChangeLanguage("en");
  }, []);

  return (
    <div className="border border-gray-300 rounded-md">
      <Toolbar
        editor={editor}
        defaultConfig={toolbarConfig}
        mode="default"
        style={{ borderBottom: "1px solid #ccc" }}
      />
      <Editor
        defaultConfig={editorConfig}
        value={html}
        onCreated={setEditor}
        mode="default"
        style={{ height: "300px", overflowY: "auto", padding: "10px" }}
      />
    </div>
  );
};

export default RichTextEditor;
