import Image, { type ImageProps } from 'next/image';

/**
 * Same as next/image but tolerates a missing/empty src (admin-entered content
 * that hasn't had a photo uploaded yet) — renders a neutral placeholder block
 * instead of throwing, so one incomplete record can't break the whole page.
 * Assumes `fill` usage inside a position:relative wrapper (the `ratio` pattern
 * used throughout this codebase).
 */
export default function SafeImage({ src, alt, ...props }: ImageProps) {
  if (!src) {
    if ('fill' in props && props.fill) {
      return <div className="img-placeholder" aria-hidden="true" />;
    }
    const { width, height } = props;
    return (
      <div
        className="img-placeholder"
        aria-hidden="true"
        style={{ position: 'static', width, height }}
      />
    );
  }
  return <Image src={src} alt={alt} {...props} />;
}
