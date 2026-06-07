"use client";

interface Props
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export default function InputField({
    label,
    ...props
}: Props) {
    return (
        <div className="rk-field">
            {label && (
                <label className="rk-label">
                    {label}
                </label>
            )}

            <input
                {...props}
                className="rk-input"
            />
        </div>
    );
}