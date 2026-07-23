import React from "react";
import { User, Mail, Lock } from "lucide-react";

const InputField = ({
  id,
  label,
  type,
  value,
  onChange
}) => {

  const getIcon = () => {

    if (type === "email") {
      return <Mail size={18} />;
    }

    if (type === "password") {
      return <Lock size={18} />;
    }

    return <User size={18} />;

  };

  return (

    <div className="video-input-group">

      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required
      />

      <label htmlFor={id}>
        {label}
      </label>

      <span className="input-icon">
        {getIcon()}
      </span>

    </div>

  );

};

export default InputField;