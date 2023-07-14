export const MEDIA_FRAGMENT = `#graphql
  fragment Media on Media {
    __typename
    mediaContentType
    alt
    previewImage {
      url
    }
    ... on MediaImage {
      id
      image {
        id
        url
        width
        height
      }
    }
    ... on Video {
      id
      sources {
        mimeType
        url
      }
    }
    ... on Model3d {
      id
      sources {
        mimeType
        url
      }
    }
    ... on ExternalVideo {
      id
      embedUrl
      host
    }
  }
`;

export const PRODUCT_CARD_FRAGMENT = `#graphql
  fragment ProductCard on Product {
    id
    title
    publishedAt
    handle
    vendor
    variants(first: 1) {
      nodes {
        id
        image {
          url
          altText
          width
          height
        }
        price {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
        selectedOptions {
          name
          value
        }
        product {
          handle
          title
        }
      }
    }
  }
`;

export const FEATURED_COLLECTION_FRAGMENT = `#graphql
  fragment FeaturedCollectionDetails on Collection {
    id
    title
    handle
    image {
      altText
      width
      height
      url
    }
  }
`;

export const SLIDESHOW_QUERY_FRAGMENT = `#graphql
  ${MEDIA_FRAGMENT}

  fragment Slide on Metaobject{
    id
    desktopBanner : field(key:"desktop_banner"){
      reference {
        ...Media
      }
    }
    mobileBanner : field(key:"mobile_banner"){
      reference {
        ...Media
      }
    }
    title: field(key:"title"){
      value
    }
    content: field(key:"content"){
      value
    }
    button_text: field(key:"button_text"){
      value
    }
    button_url: field(key:"button_url"){
      value
    }
  }
  fragment Slideshow on Metaobject{
    id
    field(key:"slide"){
      key
      value
      references(first:100){
        __typename
        nodes{
          ...Slide
        }
      }
    }
    
}`;