export function setPageMetadata(perem) {
    if (perem) {
      // ✅ Set document title
      document.title = `${perem.metaTitle} | ${perem.title}`;
  
      // ✅ Meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          perem.metaDescription || "Read this perem post."
        );
      } else {
        const newMeta = document.createElement("meta");
        newMeta.name = "description";
        newMeta.content = perem.metaDescription || "Read this perem post.";
        document.head.appendChild(newMeta);
      }
  
      // ✅ Meta keywords
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute("content", perem.keywords || "");
      } else if (perem.keywords) {
        const newKeywordsMeta = document.createElement("meta");
        newKeywordsMeta.name = "keywords";
        newKeywordsMeta.content = perem.keywords;
        document.head.appendChild(newKeywordsMeta);
      }
  
      // ✅ Open Graph metadata (for social sharing)
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute("content", perem.metaTitle || perem.title);
      } else {
        const newOgTitle = document.createElement("meta");
        newOgTitle.setAttribute("property", "og:title");
        newOgTitle.content = perem.metaTitle || perem.title;
        document.head.appendChild(newOgTitle);
      }
  
      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) {
        ogDescription.setAttribute("content", perem.metaDescription || "");
      } else {
        const newOgDescription = document.createElement("meta");
        newOgDescription.setAttribute("property", "og:description");
        newOgDescription.content = perem.metaDescription || "";
        document.head.appendChild(newOgDescription);
      }
  
      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) {
        ogImage.setAttribute("content", perem.image || "");
      } else if (perem.image) {
        const newOgImage = document.createElement("meta");
        newOgImage.setAttribute("property", "og:image");
        newOgImage.content = perem.image;
        document.head.appendChild(newOgImage);
      }
    }
  }
  