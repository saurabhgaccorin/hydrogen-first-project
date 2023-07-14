import React from 'react';
import Slider from 'react-slick';
import {MediaFile} from '@shopify/hydrogen';
import slickCss from 'slick-carousel/slick/slick.css';
import slickTheme from 'slick-carousel/slick/slick-theme.css';
import clsx from 'clsx';

import styles from './HomeCarousel.css';

import {Heading, Text, Link} from '~/components';
export default function HomeCarousel({data, top, height}) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  console.log(data);
  let slides = data.map((slide, index) => (
    <Link key={'slide' + index} to={slide.button_url?.value ?? '#'}>
      <section
        className={clsx(
          'relative justify-end flex flex-col w-full',
          top && '-mt-nav',
          'h-screen',
        )}
      >
        <div className="absolute inset-0 grid flex-grow grid-flow-col pointer-events-none auto-cols-fr -z-10 content-stretch overflow-clip">
          <MediaFile
            data={slide.desktopBanner.reference}
            className={
              (slide.mobileBanner ? 'mob-hidden' : 'block') +
              ' object-cover w-full h-full'
            }
            mediaOptions={{
              video: {
                controls: false,
                muted: true,
                loop: true,
                playsInline: true,
                autoPlay: true,
                previewImageOptions: {
                  src: slide.desktopBanner.reference.previewImage?.url ?? '',
                },
              },
              image: {
                loading: 'lazy',
                crop: 'center',
                sizes: '100vw',
                alt: data.alt || '',
              },
            }}
          />
          {slide.mobileBanner && (
            <MediaFile
              data={slide.mobileBanner.reference}
              className="desk-hidden object-cover w-full h-full"
              mediaOptions={{
                video: {
                  controls: false,
                  muted: true,
                  loop: true,
                  playsInline: true,
                  autoPlay: true,
                  previewImageOptions: {
                    src: slide.desktopBanner.reference.previewImage?.url ?? '',
                  },
                },
                image: {
                  loading: 'lazy',
                  crop: 'center',
                  sizes: '100vw',
                  alt: slide.desktopBanner.reference.alt || '',
                },
              }}
            />
          )}
        </div>
        <div className="flex flex-col items-baseline justify-between gap-4 px-6 py-8 sm:px-8 md:px-12 bg-gradient-to-t dark:from-contrast/60 dark:text-primary from-primary/60 text-contrast">
          {slide.title?.value && (
            <Heading format as="h2" size="display" className="max-w-md">
              {slide.title?.value}
            </Heading>
          )}
          {slide.content?.value && (
            <Text format width="narrow" as="p" size="lead">
              {slide.content?.value}
            </Text>
          )}
          {slide.button_text?.value && (
            <Text size="lead">{slide.button_text?.value}</Text>
          )}
        </div>
      </section>
    </Link>
  ));
  return (
    <>
      <Slider {...settings}>{slides}</Slider>
    </>
  );
}

export function links() {
  return [
    {rel: 'stylesheet', href: slickCss},
    {rel: 'stylesheet', href: slickTheme},
    {rel: 'stylesheet', href: styles},
  ];
}
