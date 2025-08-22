import React from "react";

function Input({ fields = [], onChange, formData, ...props }) {
  return (
    <div className="space-y-5">
      {fields.map((field) => (
        <div key={field.id} className="flex flex-col">
          <label
            htmlFor={field.id}
            className="mb-3 text-gray-700 font-semibold text-left"
          >
            {field.label}{" "}
            {field.required && <span className="text-red-500">*</span>}
          </label>

          {field.type === "text-area" ? (
            <textarea
              id={field.id}
              name={field.id}
              placeholder={field.placeholder}
              onChange={onChange}
              readOnly={field.readOnly || false}
              value={formData?.[field.id] ?? ""}
              required={field.required || false}
              className="border rounded-lg p-3 text-gray-700 shadow-sm hover:shadow-md 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 
                         focus:border-indigo-500 placeholder-gray-400 transition duration-300"
              {...props}
            />
          ) : (
            <input
              id={field.id}
              name={field.id}
              type={field.type || "text"}
              placeholder={field.placeholder}
              onChange={onChange}
              readOnly={field.readOnly || false}
              value={formData?.[field.id] ?? ""}
              required={field.required || false}
              className="border rounded-lg p-3 text-gray-700 shadow-sm hover:shadow-md 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 
                         focus:border-indigo-500 placeholder-gray-400 transition duration-300"
              {...props}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default Input;
