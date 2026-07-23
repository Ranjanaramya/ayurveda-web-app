import { useCallback } from 'react';
import { set, unset } from 'sanity';
import type { ObjectInputProps } from 'sanity';

/**
 * Custom image input for Sanity Studio.
 * Adds visible "Remove Photo" and "Upload New Photo" buttons
 * so editors can clearly manage the doctor profile image.
 */
export function DoctorImageInput(props: ObjectInputProps) {
  const { value, onChange, renderDefault } = props;

  const handleRemove = useCallback(() => {
    onChange(unset());
  }, [onChange]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* Render the default Sanity image input (upload + preview) */}
      {renderDefault(props)}

      {/* Only show action buttons when an image is already uploaded */}
      {value && Boolean((value as Record<string, unknown>).asset) && (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {/* Remove button */}
          <button
            type="button"
            onClick={handleRemove}
            style={{
              padding: '7px 16px',
              backgroundColor: '#e53e3e',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 600,
              lineHeight: 1.4,
            }}
          >
            🗑 Remove Photo
          </button>

          <p style={{ fontSize: '12px', color: '#888', margin: 0, alignSelf: 'center' }}>
            To upload a new photo, click the image area above or drag &amp; drop a new file.
          </p>
        </div>
      )}
    </div>
  );
}
