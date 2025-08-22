// _components/FormattedDate.tsx
"use client";

interface FormattedDateProps {
  date: string;
  className?: string;
}

export default function FormattedDate({ date, className }: FormattedDateProps) {
  return (
    <time dateTime={date} className={className}>
      Published on {new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}
    </time>
  );
}