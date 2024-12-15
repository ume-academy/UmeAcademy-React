import { useUploadImageInTextEditorMutation } from '@/redux/slices/blog/blogApiSlice';
import { useRef, useState } from 'react';
import ReactQuill from 'react-quill';

// Định dạng thanh công cụ của Quill dễ dàng edit nội dung
const toolbarOptions = [
  // Định dạng văn bản
  [{ font: [] }], // Phông chữ
  [{ size: ['small', false, 'large', 'huge'] }], // Cỡ chữ
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // Tiêu đề
  ['bold', 'italic', 'underline', 'strike'], // Các nút toggle định dạng

  // Đoạn văn bản
  ['blockquote', 'code-block'], // Đoạn trích dẫn, khối mã

  // Danh sách
  [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }], // Danh sách có thứ tự, không có thứ tự, và danh sách check

  // Chỉnh sửa phông chữ
  [{ script: 'sub' }, { script: 'super' }], // Chỉ số dưới, chỉ số trên

  // Chèn đối tượng
  ['link', 'image', 'video', 'formula'], // Thêm liên kết, hình ảnh, video, công thức

  // Căn chỉnh
  [{ align: [] }], // Căn trái, giữa, phải

  // Màu sắc và nền
  [{ color: [] }, { background: [] }], // Màu chữ, nền

  // Hỗ trợ Undo/Redo và làm sạch định dạng
  ['clean'] // Xóa định dạng
]

// Cấu hình lịch sử thao tác
const historyOptions = {
    delay: false,  // Thời gian giữ lại thay đổi trong bộ nhớ
    maxStack: 100, // Số lần hoàn tác tối đa
    userOnly: true // Chỉ lưu lịch sử thao tác của người dùng
}

// Cấu hình phím tắt
const keyboardOptions = {
  bindings: {
    bold: {
      key: 'B',
      shortKey: true // Ctrl + B hoặc Cmd + B trên macOS
    },
    italic: {
      key: 'I',
      shortKey: true // Ctrl + I hoặc Cmd + I trên macOS
    },
    underline: {
      key: 'U',
      shortKey: true // Ctrl + U hoặc Cmd + U trên macOS
    },
    strike: {
      key: 'S',
      shortKey: true // Ctrl + S hoặc Cmd + S trên macOS
    },
    'list-ordered': {
      key: 'O',
      shortKey: true // Ctrl + O hoặc Cmd + O trên macOS
    },
    'list-unordered': {
      key: 'L',
      shortKey: true // Ctrl + L hoặc Cmd + L trên macOS
    },
    'header': {
      key: 'H',
      shortKey: true // Ctrl + H hoặc Cmd + H trên macOS
    },
    'align-center': {
      key: 'E',
      shortKey: true // Ctrl + E hoặc Cmd + E trên macOS
    },
    'align-left': {
      key: 'L',
      shortKey: true // Ctrl + L hoặc Cmd + L trên macOS
    },
    'align-right': {
      key: 'R',
      shortKey: true // Ctrl + R hoặc Cmd + R trên macOS
    },
    'blockquote': {
      key: 'Q',
      shortKey: true // Ctrl + Q hoặc Cmd + Q trên macOS
    }
  }
};


export const useQuillModules = () => {
  const editorRef = useRef<ReactQuill | null>(null); // Sử dụng useRef để giữ tham chiếu đến Quill editor
  const [uploadImage] = useUploadImageInTextEditorMutation()

  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    // Khi người dùng chọn ảnh
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("upload", file);

      try {
        const response = await uploadImage({upload: formData}).unwrap(); // Call your upload API here
        // Kiểm tra nếu editorRef.current không phải là null
      if (editorRef.current) {
        const editor = editorRef.current.getEditor();
        if (editor && response?.url) {
          const range = editor.getSelection(); // Lấy vị trí con trỏ
          if (range) {
            // Chèn ảnh vào vị trí con trỏ hiện tại
            editor.insertEmbed(range.index, 'image', response.url);
          }
        }
      }
      } catch (error) {
        console.log("Upload thất bại");
      }
    };

    // Mở hộp thoại chọn file
    input.click();
  };

  const [modules, setModules] = useState({
    toolbar: {
      container: toolbarOptions,
      handlers: {
        image: handleImageUpload, // Đặt handler upload ảnh ở đây
      },
    },
    history: historyOptions,
    keyboard: keyboardOptions,
    // ImageResize: true
  })

  return {
    modules, editorRef
  }
}
