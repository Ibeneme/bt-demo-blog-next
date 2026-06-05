import { Helmet } from "react-helmet-async";

export default function SEO({ title, description, image }: any) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={image} />
      {/* OpenGraph for Social Media */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Helmet>
  );
}
