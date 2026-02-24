export function Card({ className = "", ...props }) {
  return (
    <div
      className={`kn-card ${className}`.trim()}
      {...props}
    />
  );
}

export function CardHeader({ className = "", ...props }) {
  return (
    <div
      className={`kn-card-header ${className}`.trim()}
      {...props}
    />
  );
}

export function CardTitle({ className = "", ...props }) {
  return (
    <h3
      className={`kn-card-title ${className}`.trim()}
      {...props}
    />
  );
}

export function CardDescription({ className = "", ...props }) {
  return (
    <p
      className={`kn-card-description ${className}`.trim()}
      {...props}
    />
  );
}

export function CardContent({ className = "", ...props }) {
  return (
    <div
      className={`kn-card-content ${className}`.trim()}
      {...props}
    />
  );
}

