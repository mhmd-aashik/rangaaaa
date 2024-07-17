import BlogsItem from "@/components/blog/BlogsItem";
import TrandingSlides from "@/components/blog/TrandingSlides";
import { fetchBlogs, getHotBlogs } from "@/lib/fetchBlogs";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

export async function generateMetadata({ params }: any) {
  const result = await fetch(
    `${process.env.BACKEND}/blogs?hotblogs[slug][$eq]=${params.id}&populate=*`
  );

  const data = await result.json();

  const dataResult = data.data;

  const { attributes } = dataResult[0];

  const { metatitle, metaauthor, metakeyword, metadescription } = attributes;
  const imageData = attributes.desktopView.data.attributes.formats;
  const imageUrl = imageData?.medium?.url;

  const fullImageUrl = `${process.env.NEXT_PUBLIC_IMAGE_FILE}${imageUrl}`;

  return {
    title: metatitle,
    description: metadescription,
    type: "website",
    applicationName: "Ranga Technology",
    authors: [{ name: metaauthor }],
    keywords: [metakeyword],

    images: [
      {
        url: fullImageUrl,
        width: 1200,
        height: 630,
        alt: metatitle,
      },
    ],
    openGraph: {
      title: metatitle,
      description: metadescription,
      type: "website",
      applicationName: "Ranga Technology",
      authors: [{ name: metaauthor }],
      keywords: [metakeyword],
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: metatitle,
        },
      ],
    },
  };
}

export const revalidate = 0;

const Blogs = async () => {
  const blogData = await fetchBlogs();
  const hotBlogs = await getHotBlogs();

  return (
    <div className="w-full mx-auto">
      <div className="relative w-4xl w-full mx-auto">
        <div className="absolute bottom-0 right-0 ">
          <Image
            src="/assets/vector/vector7.png"
            alt="vector8"
            width={312}
            height={270}
            draggable="false"
          />
        </div>
        <div className="mx-auto max-w-[1150px] h-full bg-[#020000] px-5">
          <div>
            <BlogsItem blogs={blogData} hotBlogs={hotBlogs} />
          </div>
          <TrandingSlides />
        </div>
      </div>
    </div>
  );
};

export default Blogs;
