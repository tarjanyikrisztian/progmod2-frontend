interface FormInputProps {
  type: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: string) => void;
}

const FormInput: React.FC<FormInputProps> = ({ type, label, placeholder, value, onChange }) => {
  return (
    <div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
        <input
          type={type}
          placeholder={placeholder}
          className="input input-bordered"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default FormInput;
