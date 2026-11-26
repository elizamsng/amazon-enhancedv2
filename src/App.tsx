import React, { useState, useMemo, useEffect } from 'react';
import {
  MapPin,
  CheckCircle2,
  ChevronRight,
  Minus,
  Plus,
  ShoppingCart,
  Feather,
  Zap,
  Crosshair,
  MousePointerClick,
  BatteryCharging,
  Monitor,
  Check,
} from 'lucide-react';
import {
  VIPER_COLOR_OPTIONS,
  VIPER_SPEC_OPTIONS,
  buildViperSpecBlocks,
  ABOUT_BULLETS,
  INITIAL_REVIEWS,
  INITIAL_CART_ITEMS,
  RELATED_CATALOG,
  CartItem,
  CatalogItem,
  ProductReview,
  ProductSpecBlock,
} from './data/productData';
import { AmazonHeader } from './components/AmazonHeader';
import { ProductGallery } from './components/ProductGallery';
import { CustomerReviewsSection } from './components/CustomerReviewsSection';
import { AmazonFooter } from './components/AmazonFooter';
import { FullView360Modal } from './components/FullView360Modal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal, ConfirmedOrder } from './components/CheckoutModal';
import { NavigationDrawer } from './components/NavigationDrawer';
import {
  LocationModal,
  SignInModal,
  CameraScanModal,
  ReviewModal,
  InfoModal,
} from './components/ActionModals';
import { SafeImage } from './components/SafeImage';
import { DiscussionEmbed } from 'disqus-react';

function SpecIcon({ iconKey }: { iconKey: ProductSpecBlock['iconKey'] }) {
  const cls = 'w-4 h-4 text-[#007185]';
  switch (iconKey) {
    case 'weight':
      return <Feather className={cls} />;
    case 'polling':
      return <Zap className={cls} />;
    case 'sensor':
      return <Crosshair className={cls} />;
    case 'switches':
      return <MousePointerClick className={cls} />;
    case 'battery':
      return <BatteryCharging className={cls} />;
    case 'platform':
      return <Monitor className={cls} />;
  }
}

export default function App() {
  // Active product (defaults to Razer Viper V4 Pro)
  const [activeProduct, setActiveProduct] = useState<CatalogItem>(RELATED_CATALOG[0]);
  const isViperDefault = activeProduct.id === 'viper-v4-pro';

  // Color & Spec variant state for Razer Viper V4 Pro
  const [selectedColorId, setSelectedColorId] = useState<'black' | 'white'>('black');
  const [selectedSpecId, setSelectedSpecId] = useState<'standard-1k' | 'pro-8k' | 'esports-glass'>('pro-8k');

  const activeColor = useMemo(
    () => VIPER_COLOR_OPTIONS.find((c) => c.id === selectedColorId) || VIPER_COLOR_OPTIONS[0],
    [selectedColorId]
  );
  const activeSpec = useMemo(
    () => VIPER_SPEC_OPTIONS.find((s) => s.id === selectedSpecId) || VIPER_SPEC_OPTIONS[1],
    [selectedSpecId]
  );

  // Effective display title, price, image & specs reflecting selected color/spec
  const effectivePrice = isViperDefault ? activeSpec.price : activeProduct.price;
  const effectiveTypicalPrice = isViperDefault
    ? activeSpec.typicalPrice
    : activeProduct.typicalPrice;
  const effectiveImage = isViperDefault ? activeColor.gallery[0].src : activeProduct.image;
  const effectiveVariantLabel = isViperDefault
    ? `${activeColor.name} · ${activeSpec.name}`
    : activeProduct.subtitle;
  const effectiveCartId = isViperDefault
    ? `viper-v4-pro-${activeColor.id}-${activeSpec.id}`
    : activeProduct.id;
  const effectiveCartTitle = isViperDefault
    ? `Razer Viper V4 Pro (${activeColor.name}, ${activeSpec.name})`
    : activeProduct.title;

  const specBlocks = useMemo(() => {
    if (isViperDefault) {
      return buildViperSpecBlocks(activeSpec);
    }
    return (
      activeProduct.specs || [
        {
          id: 'brand',
          label: 'Brand',
          value: activeProduct.brand,
          detail: 'Official flagship stock',
          iconKey: 'platform' as const,
        },
        {
          id: 'category',
          label: 'Category',
          value: activeProduct.category,
          detail: activeProduct.shortTitle,
          iconKey: 'sensor' as const,
        },
      ]
    );
  }, [isViperDefault, activeSpec, activeProduct]);

  // Gallery state
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [fullViewOpen, setFullViewOpen] = useState(false);

  // Cart & Purchase state
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [deletedCartItems, setDeletedCartItems] = useState<{ item: CartItem; index: number }[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [quantityInput, setQuantityInput] = useState('1');
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [cartMinimized, setCartMinimized] = useState(true);
  const [addedToCartNotice, setAddedToCartNotice] = useState<string | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  const [checkoutIsBuyNow, setCheckoutIsBuyNow] = useState(false);

  // User, Location, Search, Wishlist, Orders, Reviews
  const [postalCode, setPostalCode] = useState('049145');
  const [userName, setUserName] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('Razer Viper V4 Pro');
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [orders, setOrders] = useState<ConfirmedOrder[]>([]);
  const [reviews, setReviews] = useState<ProductReview[]>(INITIAL_REVIEWS);

  // Drawers & Modals
  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [cameraModalOpen, setCameraModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [infoModal, setInfoModal] = useState<{ title: string; message: string } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('pricing-section');

  useEffect(() => {
    const sectionIds = ['pricing-section', 'specs-section', 'about-section', 'reviews-section'];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible?.target?.id) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: '-120px 0px -55% 0px', threshold: 0.1 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    window.setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const galleryItems = useMemo(() => {
    if (isViperDefault) return activeColor.gallery;
    return [
      {
        id: activeProduct.id,
        label: 'Main',
        alt: activeProduct.title,
        src: activeProduct.image,
        caption: activeProduct.shortTitle,
      },
    ];
  }, [activeProduct, isViperDefault, activeColor]);

  const isWishlisted = wishlistIds.includes(activeProduct.id);
  const wishlistCatalogItems = useMemo(
    () => RELATED_CATALOG.filter((item) => wishlistIds.includes(item.id)),
    [wishlistIds]
  );

  const priceDollars = Math.floor(effectivePrice);
  const priceCents = (effectivePrice % 1).toFixed(2).substring(2);
  const discountPct = Math.round(
    ((effectiveTypicalPrice - effectivePrice) / effectiveTypicalPrice) * 100
  );

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectCatalogItem = (item: CatalogItem) => {
    setActiveProduct(item);
    setActiveGalleryIndex(0);
    setQuantity(1);
    setQuantityInput('1');
    setAddedToCartNotice(null);
    setSearchQuery(item.shortTitle);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectColor = (colorId: 'black' | 'white') => {
    setSelectedColorId(colorId);
    setActiveGalleryIndex(0);
    setAddedToCartNotice(null);
  };

  const handleSelectSpec = (specId: 'standard-1k' | 'pro-8k' | 'esports-glass') => {
    setSelectedSpecId(specId);
    setAddedToCartNotice(null);
  };

  const handleToggleWishlist = () => {
    setWishlistIds((prev) => {
      const exists = prev.includes(activeProduct.id);
      const next = exists
        ? prev.filter((id) => id !== activeProduct.id)
        : [...prev, activeProduct.id];
      showToast(exists ? 'Removed from Wish List' : '❤️ Saved to your Wish List');
      return next;
    });
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: activeProduct.shortTitle,
          text: `Check out ${activeProduct.shortTitle} on Amazon.sg`,
          url: shareUrl,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      showToast('Product link copied to clipboard');
    } catch {
      showToast('Ready to share: Amazon.sg — Razer Viper V4 Pro');
    }
  };

  const handleAddToCart = () => {
    const safeQty = Math.max(1, Math.min(99, quantity));
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === effectiveCartId);
      if (existing) {
        return prev.map((i) =>
          i.id === effectiveCartId ? { ...i, quantity: i.quantity + safeQty } : i
        );
      }
      return [
        ...prev,
        {
          id: effectiveCartId,
          title: effectiveCartTitle,
          price: effectivePrice,
          quantity: safeQty,
          image: effectiveImage,
          seller: 'Razer Official Flagship',
          inStock: activeProduct.inStock,
        },
      ];
    });
    setCartDrawerOpen(false);
    setCartMinimized(true);
    setAddedToCartNotice(`Added ${safeQty} × ${effectiveCartTitle}`);
    showToast(`Added ${safeQty} to Cart — continue shopping`);
  };

  const handleBuyNow = () => {
    const safeQty = Math.max(1, Math.min(99, quantity));
    setCheckoutItems([
      {
        id: effectiveCartId,
        title: effectiveCartTitle,
        price: effectivePrice,
        quantity: safeQty,
        image: effectiveImage,
        seller: 'Razer Official Flagship',
        inStock: activeProduct.inStock,
      },
    ]);
    setCheckoutIsBuyNow(true);
    setCheckoutOpen(true);
  };

  const handleProceedToCartCheckout = () => {
    setCheckoutItems(cartItems);
    setCheckoutIsBuyNow(false);
    setCartDrawerOpen(false);
    setCheckoutOpen(true);
  };

  const handleOrderConfirmed = (order: ConfirmedOrder) => {
    setOrders((prev) => [order, ...prev]);
    if (!checkoutIsBuyNow) {
      setCartItems([]);
      setDeletedCartItems([]);
    }
  };

  const handleRemoveCartItem = (id: string) => {
    const idx = cartItems.findIndex((item) => item.id === id);
    if (idx === -1) return;
    const removed = cartItems[idx];
    setDeletedCartItems((prev) => [...prev, { item: removed, index: idx }]);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    showToast(`Removed ${removed.title} from Cart`);
  };

  const handleSetCartItemQty = (id: string, nextQty: number) => {
    if (nextQty <= 0) {
      handleRemoveCartItem(id);
      return;
    }
    const clamped = Math.min(99, nextQty);
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: clamped } : item))
    );
  };

  const handleUndoDelete = () => {
    if (deletedCartItems.length === 0) return;
    const lastEntry = deletedCartItems[deletedCartItems.length - 1];
    setDeletedCartItems((prev) => prev.slice(0, -1));
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === lastEntry.item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === lastEntry.item.id
            ? { ...i, quantity: Math.min(99, i.quantity + lastEntry.item.quantity) }
            : i
        );
      }
      const next = [...prev];
      const insertAt = Math.min(lastEntry.index, next.length);
      next.splice(insertAt, 0, lastEntry.item);
      return next;
    });
    showToast(`Restored ${lastEntry.item.title} to Cart`);
  };

  const handleDismissUndo = () => {
    setDeletedCartItems([]);
  };

  const handleAddReview = (newReview: ProductReview) => {
    setReviews((prev) => [newReview, ...prev]);
    showToast('Thank you! Your review has been posted.');
  };

  const totalRatingsCount = 242 + (reviews.length - INITIAL_REVIEWS.length);

  const disqusConfig = useMemo(
    () => ({
      url:
        typeof window !== 'undefined'
          ? `${window.location.origin}${window.location.pathname}`
          : undefined,
      identifier: activeProduct.id,
      title: activeProduct.title,
      language: 'en',
    }),
    [activeProduct.id, activeProduct.title]
  );

  return (
    <div id="top" className="min-h-screen flex flex-col bg-[#EAEDED] text-neutral-900">
      {/* Locked System Header (status, search, location & quick section jumps) */}
      <AmazonHeader
        cartCount={cartCount}
        postalCode={postalCode}
        userName={userName}
        searchQuery={searchQuery}
        activeProductTitle={activeProduct.shortTitle}
        activeSection={activeSection}
        onSearchChange={setSearchQuery}
        onOpenMenu={() => setMenuDrawerOpen(true)}
        onOpenSignIn={() => setSignInModalOpen(true)}
        onOpenCart={() => {
          setCartMinimized(false);
          setCartDrawerOpen(true);
        }}
        onOpenLocation={() => setLocationModalOpen(true)}
        onOpenCameraScan={() => setCameraModalOpen(true)}
        onSelectCatalogItem={handleSelectCatalogItem}
        onScrollToSection={scrollToSection}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-3 lg:px-6 py-2 text-xs text-[#007185] flex items-center space-x-1 overflow-x-auto no-scrollbar whitespace-nowrap">
          <button
            type="button"
            onClick={() => handleSelectCatalogItem(RELATED_CATALOG[0])}
            className="hover:underline"
          >
            Electronics
          </button>
          <span className="text-gray-400">›</span>
          <button
            type="button"
            onClick={() => handleSelectCatalogItem(RELATED_CATALOG[0])}
            className="hover:underline"
          >
            Computers &amp; Accessories
          </button>
          <span className="text-gray-400">›</span>
          <button
            type="button"
            onClick={() => handleSelectCatalogItem(RELATED_CATALOG[0])}
            className="text-gray-600 font-medium hover:underline"
          >
            {activeProduct.category}
          </button>
          {!isViperDefault && (
            <>
              <span className="text-gray-400">›</span>
              <button
                type="button"
                onClick={() => handleSelectCatalogItem(RELATED_CATALOG[0])}
                className="text-[#C7511F] font-semibold hover:underline ml-2"
              >
                ← Back to Razer Viper V4 Pro
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Main Content Container */}
      <main className="flex-1 bg-white max-w-[1440px] w-full mx-auto">
        {/* Product Top Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-6 lg:px-6 lg:py-5 lg:items-start border-b border-gray-200">
          {/* BLOCK A: Clean User-Friendly Title & Rating */}
          <section
            className="p-4 pb-2 lg:p-0 lg:col-start-6 lg:col-span-4 lg:row-start-1"
            data-purpose="product-meta"
          >
            <div className="flex items-center justify-between mb-1.5">
              <button
                type="button"
                onClick={() =>
                  setInfoModal({
                    title: 'Razer Official Flagship Store',
                    message:
                      'Shop authentic Razer esports peripherals fulfilled by Amazon SG with local warranty support.',
                  })
                }
                className="text-xs font-semibold text-[#007185] hover:text-[#C7511F] hover:underline"
              >
                {activeProduct.brand} Official Store
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('reviews-section')}
                className="flex items-center space-x-1 hover:opacity-80"
              >
                <span className="text-amber-500 text-xs" aria-hidden="true">
                  ★★★★★
                </span>
                <span className="text-xs text-[#007185] ml-1 font-medium tabular-nums">
                  {activeProduct.rating.toFixed(1)}
                </span>
                <span className="text-xs text-gray-500 tabular-nums">
                  ({isViperDefault ? totalRatingsCount : activeProduct.reviewCount})
                </span>
              </button>
            </div>

            <h1 className="text-xl lg:text-2xl font-bold text-gray-900 leading-tight tracking-tight text-balance">
              {activeProduct.title}
            </h1>
            <p className="text-xs lg:text-sm text-gray-600 mt-1">
              {effectiveVariantLabel}
            </p>

            <div className="mt-2.5 flex items-center flex-wrap gap-2 text-xs text-gray-500">
              <span className="amazon-badge-orange px-2 py-0.5 pr-3 text-[11px] font-bold uppercase">
                #1 Best Seller
              </span>
              <span aria-hidden="true">·</span>
              <span>500+ bought in past month</span>
            </div>
          </section>

          {/* BLOCK B: Main Product Gallery */}
          <div className="lg:col-start-1 lg:col-span-5 lg:row-start-1 lg:row-span-4">
            <ProductGallery
              items={galleryItems}
              activeIndex={activeGalleryIndex}
              onChangeIndex={setActiveGalleryIndex}
              isWishlisted={isWishlisted}
              onToggleWishlist={handleToggleWishlist}
              onShare={handleShare}
              onOpenFullView={() => setFullViewOpen(true)}
            />
          </div>

          {/* BLOCK C: Eye-Catching Inline Price + Color & Spec Configurator */}
          <section
            id="pricing-section"
            className="p-4 lg:px-0 lg:py-3 lg:col-start-6 lg:col-span-4 lg:row-start-2 border-b border-gray-200 space-y-4 scroll-mt-32 lg:scroll-mt-28"
            data-purpose="pricing-block"
          >
            {/* Eye-catching Inline Price Callout */}
            <div className="bg-gradient-to-r from-[#FFF8E6] via-[#FFFDF7] to-white border border-[#F3D58D] rounded-xl px-4 py-3">
              <div className="flex items-baseline flex-wrap gap-x-3 gap-y-1">
                <div className="flex items-start tabular-nums text-gray-900">
                  <span className="text-sm font-bold mt-1">S$</span>
                  <span className="text-3xl lg:text-4xl font-extrabold tracking-tight leading-none">
                    {priceDollars}
                  </span>
                  <span className="text-sm font-bold mt-1">{priceCents}</span>
                </div>

                <span className="inline-flex items-center bg-[#CC0C39] text-white text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wide tabular-nums">
                  -{discountPct}% Deal
                </span>

                <span className="text-xs text-gray-500 tabular-nums">
                  Was <span className="line-through">S${effectiveTypicalPrice.toFixed(2)}</span>
                </span>
              </div>

              <p className="text-[11px] text-gray-600 mt-1.5">
                <span className="font-semibold text-gray-800">GST included</span> · Free SG
                delivery on eligible orders
              </p>
            </div>

            {/* Flexibility & Efficiency: Color & Spec Options on Same Page */}
            {isViperDefault && (
              <div className="space-y-3.5 pt-1">
                {/* Color Toggle (Black / White) */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-gray-600 font-medium">
                      Color: <strong className="text-gray-900">{activeColor.name}</strong>
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    {VIPER_COLOR_OPTIONS.map((color) => {
                      const selected = color.id === activeColor.id;
                      return (
                        <button
                          key={color.id}
                          type="button"
                          onClick={() => handleSelectColor(color.id)}
                          aria-pressed={selected}
                          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg border text-left transition-all ${
                            selected
                              ? 'border-[#007185] bg-teal-50/40 ring-1 ring-[#007185]'
                              : 'border-gray-200 hover:border-gray-400 bg-white'
                          }`}
                        >
                          <span
                            className="w-5 h-5 rounded-full border shrink-0 flex items-center justify-center shadow-xs"
                            style={{
                              backgroundColor: color.swatchHex,
                              borderColor: color.ringHex,
                            }}
                          >
                            {selected && (
                              <Check
                                className={`w-3 h-3 ${
                                  color.id === 'black' ? 'text-white' : 'text-gray-900'
                                }`}
                                strokeWidth={3}
                              />
                            )}
                          </span>
                          <span className="text-xs font-semibold text-gray-900 truncate">
                            {color.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Spec / Configuration Toggle */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-gray-600 font-medium">
                      Configuration: <strong className="text-gray-900">{activeSpec.name}</strong>
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {VIPER_SPEC_OPTIONS.map((spec) => {
                      const selected = spec.id === activeSpec.id;
                      return (
                        <button
                          key={spec.id}
                          type="button"
                          onClick={() => handleSelectSpec(spec.id)}
                          aria-pressed={selected}
                          className={`p-2.5 rounded-lg border text-left transition-all flex flex-col justify-between ${
                            selected
                              ? 'border-[#007185] bg-teal-50/40 ring-1 ring-[#007185]'
                              : 'border-gray-200 hover:border-gray-400 bg-white'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-xs font-bold text-gray-900 leading-tight">
                                {spec.name}
                              </span>
                            </div>
                            <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">
                              {spec.summary}
                            </p>
                          </div>
                          <p className="text-xs font-bold text-gray-900 mt-1.5 tabular-nums">
                            S${spec.price.toFixed(2)}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* BLOCK D: Buy Box (Delivery & Stock + Purchase Actions + Brand Reputation) */}
          <div className="lg:col-start-10 lg:col-span-3 lg:row-start-1 lg:row-span-4 lg:sticky lg:top-28 space-y-0 lg:space-y-4">
            <div className="lg:border lg:border-[#D5D9D9] lg:rounded-lg lg:overflow-hidden bg-white">
              {/* Desktop Buy Box Inline Price Summary */}
              <div className="hidden lg:block px-4 pt-4 pb-2 border-b border-gray-100">
                <div className="flex items-baseline gap-2 tabular-nums">
                  <div className="flex items-start text-gray-900">
                    <span className="text-xs font-bold mt-0.5">S$</span>
                    <span className="text-2xl font-extrabold tracking-tight leading-none">
                      {priceDollars}
                    </span>
                    <span className="text-xs font-bold mt-0.5">{priceCents}</span>
                  </div>
                  <span className="text-xs font-bold text-[#CC0C39]">-{discountPct}%</span>
                  <span className="text-[11px] text-gray-500 line-through">
                    S${effectiveTypicalPrice.toFixed(2)}
                  </span>
                </div>
                {isViperDefault && (
                  <p className="text-[11px] text-gray-600 mt-1 truncate">
                    {activeColor.name} · {activeSpec.name}
                  </p>
                )}
              </div>

              {/* Delivery & Stock Section */}
              <section
                className="p-4 border-b border-gray-200 lg:border-b-0 text-sm space-y-3"
                data-purpose="fulfillment-info"
              >
                <div className="text-xs leading-relaxed">
                  <span className="text-teal-700 font-bold">FREE Delivery</span>{' '}
                  <span className="font-bold text-gray-900">{activeProduct.deliveryDate}</span>.
                  Order within <span className="text-green-700 font-semibold">14 hrs 32 mins</span>
                </div>

                {/* Location Link */}
                <button
                  type="button"
                  onClick={() => setLocationModalOpen(true)}
                  className="flex items-center text-xs text-[#007185] hover:underline text-left"
                >
                  <MapPin className="w-4 h-4 mr-1 text-gray-500 shrink-0" />
                  <span>Deliver to Singapore {postalCode}</span>
                </button>

                {/* In Stock Status */}
                <div className="text-base font-semibold text-green-700">In Stock</div>

                {/* Seller & Fulfillment Details */}
                <div className="text-xs text-gray-600 grid grid-cols-2 gap-y-1.5 pt-2 border-t border-gray-100">
                  <span className="text-gray-500">Ships from</span>
                  <span className="font-medium text-gray-800">Amazon SG</span>
                  <span className="text-gray-500">Sold by</span>
                  <span className="font-medium text-gray-800">Razer Official Flagship</span>
                  <span className="text-gray-500">Returns</span>
                  <button
                    type="button"
                    onClick={() =>
                      setInfoModal({
                        title: '15-Day Refund or Replacement',
                        message:
                          'Eligible for full refund or free replacement within 15 days of receipt in original packaging via Amazon.sg Return Center.',
                      })
                    }
                    className="text-[#007185] hover:underline font-medium text-left"
                  >
                    15-day refund/replacement
                  </button>
                  <span className="text-gray-500">Payment</span>
                  <button
                    type="button"
                    onClick={() =>
                      setInfoModal({
                        title: 'Your Transaction is Secure',
                        message:
                          'Amazon.sg encrypts payment details during transmission and supports Visa, Mastercard, Amex, and PayNow SG.',
                      })
                    }
                    className="text-[#007185] hover:underline font-medium text-left"
                  >
                    Secure transaction
                  </button>
                </div>
              </section>

              {/* Purchase Actions Section */}
              <section
                className="p-4 pt-4 lg:pt-0 space-y-3 border-b border-gray-200 lg:border-b-0"
                data-purpose="cart-buy-actions"
              >
                {/* Quantity Selector */}
                <div>
                  <label
                    className="block text-[11px] font-semibold text-gray-600 mb-1"
                    htmlFor="quantity-input"
                  >
                    Quantity
                  </label>
                  <div className="inline-flex items-center bg-gray-100 border border-gray-300 rounded-lg shadow-xs overflow-hidden">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => {
                        const next = Math.max(1, quantity - 1);
                        setQuantity(next);
                        setQuantityInput(String(next));
                      }}
                      className="px-2.5 py-2 text-gray-700 hover:bg-gray-200 active:bg-gray-300 transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <input
                      id="quantity-input"
                      type="number"
                      inputMode="numeric"
                      min={1}
                      max={99}
                      value={quantityInput}
                      onChange={(e) => {
                        const raw = e.target.value;
                        setQuantityInput(raw);
                        const parsed = parseInt(raw, 10);
                        if (!Number.isNaN(parsed) && parsed >= 1) {
                          setQuantity(Math.min(99, parsed));
                        }
                      }}
                      onBlur={() => {
                        const parsed = parseInt(quantityInput, 10);
                        const clamped = Number.isNaN(parsed)
                          ? 1
                          : Math.max(1, Math.min(99, parsed));
                        setQuantity(clamped);
                        setQuantityInput(String(clamped));
                      }}
                      aria-label="Type product quantity"
                      className="w-12 text-center bg-white py-1.5 text-xs font-bold text-gray-900 border-x border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#007185] tabular-nums [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => {
                        const next = Math.min(99, quantity + 1);
                        setQuantity(next);
                        setQuantityInput(String(next));
                      }}
                      className="px-2.5 py-2 text-gray-700 hover:bg-gray-200 active:bg-gray-300 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button (Aligned Cart Symbol) */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full bg-[#FFD814] hover:bg-[#F7CA00] active:bg-[#F0B800] text-gray-900 font-semibold py-3 rounded-full shadow-xs text-sm border border-[#FCD200] transition duration-150 flex items-center justify-center gap-2 tracking-wide"
                >
                  <ShoppingCart className="w-4 h-4 shrink-0" strokeWidth={2} />
                  <span>Add to Cart</span>
                </button>

                {addedToCartNotice && (
                  <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2 text-xs text-green-900 space-y-1">
                    <p className="font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-700 shrink-0" />
                      <span className="truncate">{addedToCartNotice}</span>
                    </p>
                    <div className="flex items-center gap-3 pl-5">
                      <button
                        type="button"
                        onClick={() => {
                          setCartMinimized(false);
                          setCartDrawerOpen(true);
                        }}
                        className="text-[#007185] hover:underline font-semibold"
                      >
                        View Cart ({cartCount})
                      </button>
                      <button
                        type="button"
                        onClick={() => setAddedToCartNotice(null)}
                        className="text-gray-600 hover:underline"
                      >
                        Keep shopping
                      </button>
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full bg-[#FFA41C] hover:bg-[#FA8900] active:bg-[#E88B00] text-gray-900 font-semibold py-3 rounded-full shadow-xs text-sm border border-[#F28C00] transition duration-150 flex items-center justify-center tracking-wide"
                >
                  Buy Now
                </button>

                {/* Consistent Heart Emoji Add to Wish List */}
                <div className="pt-1 text-center">
                  <button
                    type="button"
                    onClick={handleToggleWishlist}
                    className={`w-full py-2 rounded-full border text-xs font-medium inline-flex items-center justify-center gap-1.5 transition-colors ${
                      isWishlisted
                        ? 'border-[#CC0C39]/30 bg-red-50/50 text-[#CC0C39]'
                        : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <span aria-hidden="true">{isWishlisted ? '❤️' : '🤍'}</span>
                    <span>{isWishlisted ? 'Saved to Wish List' : 'Add to Wish List'}</span>
                  </button>
                </div>
              </section>
            </div>

            {/* Brand Reputation Badge */}
            <section className="p-3 bg-gray-50 border-b lg:border lg:rounded-lg border-gray-200 text-xs text-gray-700 flex items-center space-x-3">
              <div className="bg-gray-800 text-white font-bold text-[10px] px-2 py-0.5 rounded tracking-wide uppercase shrink-0">
                Top Brand
              </div>
              <div className="space-y-0.5">
                <p className="font-medium text-gray-900 flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-1 shrink-0 fill-green-600 text-white" />
                  <span>88% positive ratings from 500+ customers</span>
                </p>
                <p className="text-gray-500 text-[11px]">500+ recent orders from this brand</p>
              </div>
            </section>
          </div>

          {/* BLOCK E: Visual Blocks for Specifications & About This Item */}
          <div className="lg:col-start-6 lg:col-span-4 lg:row-start-3">
            {/* Visual Blocks for Product Specifications */}
            <section
              id="specs-section"
              className="p-4 lg:px-0 lg:py-4 border-b border-gray-200 scroll-mt-32 lg:scroll-mt-28"
              data-purpose="product-specs-blocks"
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-bold text-gray-900">Key Specifications</h2>
                {isViperDefault && (
                  <span className="text-xs text-gray-500">{activeSpec.name}</span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {specBlocks.map((spec) => (
                  <div
                    key={spec.id}
                    className="rounded-xl border border-gray-200 bg-gray-50/70 p-3 flex items-start gap-2.5 hover:border-[#007185]/40 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0">
                      <SpecIcon iconKey={spec.iconKey} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-medium text-gray-500 leading-none">
                        {spec.label}
                      </p>
                      <p className="text-sm font-bold text-gray-900 mt-1 tabular-nums leading-tight">
                        {spec.value}
                      </p>
                      <p className="text-[11px] text-gray-600 mt-0.5 leading-snug">
                        {spec.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* About this item */}
            <section
              id="about-section"
              className="p-4 lg:px-0 lg:py-4 text-xs leading-relaxed scroll-mt-32 lg:scroll-mt-28"
              data-purpose="feature-bullets"
            >
              <h2 className="text-base font-bold text-gray-900 mb-2.5">Highlights</h2>
              <ul className="list-disc pl-4 space-y-2 text-gray-800">
                {ABOUT_BULLETS.map((bullet) => (
                  <li key={bullet.lead}>
                    <span className="font-semibold">{bullet.lead}</span> – {bullet.body}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        {/* Frequently Bought Together / Related Razer Gear Strip */}
        <section className="p-4 lg:p-6 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-gray-900">
              Frequently bought together from Razer
            </h2>
            <span className="text-xs text-gray-500">Singapore local stock</span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {RELATED_CATALOG.map((item) => {
              const isCurrent = item.id === activeProduct.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectCatalogItem(item)}
                  className={`text-left p-3 rounded-lg border transition-all flex flex-col justify-between ${
                    isCurrent
                      ? 'border-[#007185] bg-teal-50/30'
                      : 'border-gray-200 hover:border-gray-400 bg-white'
                  }`}
                >
                  <div>
                    <div className="h-24 w-full flex items-center justify-center mb-2 bg-white rounded">
                      <SafeImage
                        src={item.image}
                        alt={item.shortTitle}
                        className="max-h-20 w-auto object-contain"
                      />
                    </div>
                    <p className="text-xs font-semibold text-gray-900 line-clamp-2 leading-snug">
                      {item.shortTitle}
                    </p>
                  </div>
                  <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-900 tabular-nums">
                      S${item.price.toFixed(2)}
                    </span>
                    <span className="text-[11px] text-[#007185] font-medium inline-flex items-center">
                      {isCurrent ? 'Viewing' : 'View'}
                      {!isCurrent && <ChevronRight className="w-3 h-3 ml-0.5" />}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Customer Reviews Summary */}
        <CustomerReviewsSection
          reviews={reviews}
          averageRating={activeProduct.rating}
          totalRatingsCount={isViperDefault ? totalRatingsCount : activeProduct.reviewCount}
          onOpenWriteReview={() => setReviewModalOpen(true)}
        />

        <DiscussionEmbed
          shortname='amazon-m7bdqgc0td'
          config={disqusConfig}
        />
      </main>

      {/* Footer */}
      <AmazonFooter
        onOpenLocation={() => setLocationModalOpen(true)}
        onShowInfo={(title, message) => setInfoModal({ title, message })}
      />

      {/* Interactive Overlays & Modals */}
      <FullView360Modal
        isOpen={fullViewOpen}
        onClose={() => setFullViewOpen(false)}
        items={galleryItems}
        activeIndex={activeGalleryIndex}
        onChangeIndex={setActiveGalleryIndex}
        productTitle={isViperDefault ? `${activeProduct.title} (${activeColor.name})` : activeProduct.title}
        productPrice={effectivePrice}
        productHighlights={ABOUT_BULLETS}
      />

      <CartDrawer
        isOpen={cartDrawerOpen}
        isMinimized={cartMinimized}
        onMinimize={() => {
          setCartDrawerOpen(false);
          setCartMinimized(true);
        }}
        onExpand={() => {
          setCartMinimized(false);
          setCartDrawerOpen(true);
        }}
        onClose={() => {
          setCartDrawerOpen(false);
          setCartMinimized(false);
        }}
        items={cartItems}
        deletedItems={deletedCartItems.map((entry) => entry.item)}
        postalCode={postalCode}
        onSetQty={handleSetCartItemQty}
        onRemoveItem={handleRemoveCartItem}
        onUndoDelete={handleUndoDelete}
        onDismissUndo={handleDismissUndo}
        onProceedToCheckout={handleProceedToCartCheckout}
      />

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={checkoutItems}
        postalCode={postalCode}
        defaultName={userName}
        onOrderConfirmed={handleOrderConfirmed}
      />

      <NavigationDrawer
        isOpen={menuDrawerOpen}
        onClose={() => setMenuDrawerOpen(false)}
        userName={userName}
        wishlistItems={wishlistCatalogItems}
        orders={orders}
        onOpenSignIn={() => setSignInModalOpen(true)}
        onSelectCatalogItem={handleSelectCatalogItem}
        onScrollToSection={scrollToSection}
      />

      <LocationModal
        isOpen={locationModalOpen}
        onClose={() => setLocationModalOpen(false)}
        currentPostal={postalCode}
        onSelectPostal={(p) => {
          setPostalCode(p);
          showToast(`Delivery location updated to Singapore ${p}`);
        }}
      />

      <SignInModal
        isOpen={signInModalOpen}
        onClose={() => setSignInModalOpen(false)}
        userName={userName}
        onSignIn={(name) => {
          setUserName(name);
          showToast(`Welcome back, ${name}`);
        }}
        onSignOut={() => {
          setUserName(null);
          showToast('Signed out of Amazon.sg');
        }}
      />

      <CameraScanModal
        isOpen={cameraModalOpen}
        onClose={() => setCameraModalOpen(false)}
      />

      <ReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        defaultAuthor={userName}
        onSubmitReview={handleAddReview}
      />

      <InfoModal info={infoModal} onClose={() => setInfoModal(null)} />

      {/* Subtle Toast Feedback */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-[#131921] text-white text-xs font-medium px-4 py-2.5 rounded-full shadow-lg border border-white/15 whitespace-nowrap"
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}
