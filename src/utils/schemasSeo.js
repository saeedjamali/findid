import { Description } from "@headlessui/react";

export function addSiteJsonLd() {
  return {
    __html: `
       {
          "@context": "http://schema.org",
          "@graph": [
             {
                "@type": "Organization",
                "@id": "https://findid.ir/#organization",
                "name": "FindId مرجع تبادل شناسه های اینترنتی ",
                "url": "https:/findid.ir/",
                "sameAs": [
                   "http://ble.ir/findid",
                   "https://www.t.me/findidir",
                ],
                "logo": {
                   "@type": "ImageObject",
                   "@id": "https://findid.ir/#logo",
                   "url": "https://findid.ir/_next/image?url=%2Fimages%2Flogo-text-right.png&w=256&q=75",
                   "width": 350,
                   "height": 350,
                   "caption": "FindId"
                }}]}
       `,
  };
}

export function addBreadCrumbsJsonLd(title, id) {
  return {
    __html: `
       {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement":
          [
           {
            "@type": "ListItem",
            "position": 1,
            "item":
            {
             "@id": "https://findid.ir",
             "name": "خانه"
             }
           },
           {
            "@type": "ListItem",
           "position": 2,
           "item":
            {
              "@id": https://findid.ir/${title}?id=${id},
              "name": "مرجع تبادل شناسه های اینترنتی"
            }
           }
          ]
         }
       `,
  };
}

export function addProductJsonLd(id, title, view, description, price) {
  return {
    __html: `
       {
          "@context": "https://schema.org",
          "@type": "Product",
          "aggregateRating": {
            "@type": "AggregateRating",
        
            "reviewCount": ${view}
          },
          "name": ${title} ${id},
          "description": ${description},
          "image": "product image url",
          "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock",
            "price": ${price},
            "priceCurrency": "IRR"
          }
       }
       `,
  };
}

{
  /* <script
type="application/ld+json"
dangerouslySetInnerHTML={addSiteJsonLd()}
key="site-jsonld"
/> */
}

{
  /* <script
type="application/ld+json"
dangerouslySetInnerHTML={addBreadCrumbsJsonLd()}
key="breadcrumbs-jsonld"
/> */
}

{
  /* <script
type="application/ld+json"
dangerouslySetInnerHTML={addProductJsonLd()}
key="product-jsonld"
/> */
}
