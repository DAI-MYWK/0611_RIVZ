"use client"

import type React from "react"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export default function Home() {
  const serviceOverviewRef = useRef<HTMLDivElement>(null)
  const heroSectionRef = useRef<HTMLDivElement>(null)
  const examplesRef = useRef<HTMLDivElement>(null)
  const realEstateRef = useRef<HTMLDivElement>(null)
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([])
  const consultationRef = useRef<HTMLDivElement>(null)
  const companyRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const rivzMeaningRef = useRef<HTMLDivElement>(null)
  const exampleCardRefs = useRef<(HTMLDivElement | null)[]>([])
  const stepCardRefs = useRef<(HTMLDivElement | null)[]>([])
  const rivzLetterRefs = useRef<(HTMLDivElement | null)[]>([])

  // ヒーロー画像のスライドショー用の状態
  const [currentHeroImage, setCurrentHeroImage] = useState(0)
  const heroImages = ["/images/hero03.png", "/images/hero02.png", "/images/hero04.png"]

  // ハンバーガーメニューの状態
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // ここに実際のフォーム送信処理を追加
    alert("お問い合わせありがとうございます。担当者より連絡させていただきます。")
    setFormData({
      name: "",
      phone: "",
      email: "",
      address: "",
      message: "",
    })
  }

  // ハンバーガーメニューの開閉
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // モバイルメニューのリンククリック時にメニューを閉じる
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  // スクロールアニメーション用の関数
  const checkScroll = () => {
    // 閾値を0.8から0.95に上げて、より早くアニメーションを開始するようにします
    const scrollPosition = window.scrollY + window.innerHeight * 0.95
    const heroSection = heroSectionRef.current
    const serviceOverview = serviceOverviewRef.current

    // 既存のアニメーション
    if (heroSection && serviceOverview) {
      // ヒーローセクションのパララックス効果
      heroSection.style.transform = `translateY(${window.scrollY * 0.2}px)`

      // スクロール位置に基づいて2つ目のセクションの表示を調整
      const heroHeight = heroSection.offsetHeight
      const scrollRatio = Math.min(window.scrollY / (heroHeight * 0.5), 1)

      // スケールと不透明度を調整
      serviceOverview.style.transform = `scale(${0.95 + scrollRatio * 0.05})`
      serviceOverview.style.opacity = `${0.7 + scrollRatio * 0.3}`
      serviceOverview.style.boxShadow = `0 ${10 + scrollRatio * 20}px ${30 + scrollRatio * 20}px rgba(0, 0, 0, ${0.1 + scrollRatio * 0.1})`
    }

    // 新しいアニメーション
    // 実績例セクション
    if (examplesRef.current) {
      const examplesTop = examplesRef.current.getBoundingClientRect().top + window.scrollY
      if (scrollPosition > examplesTop) {
        examplesRef.current.classList.add("is-visible")
      }
    }

    // 実績例カード（遅延表示）
    exampleCardRefs.current.forEach((card, index) => {
      if (card) {
        const cardTop = card.getBoundingClientRect().top + window.scrollY
        if (scrollPosition > cardTop) {
          setTimeout(() => {
            card.classList.add("is-visible")
          }, 100 * index) // 遅延時間を短縮
        }
      }
    })

    // 不動産買取セクション
    if (realEstateRef.current) {
      const realEstateTop = realEstateRef.current.getBoundingClientRect().top + window.scrollY
      if (scrollPosition > realEstateTop) {
        realEstateRef.current.classList.add("is-visible")
      }
    }

    // RIVZ意味セクション
    if (rivzMeaningRef.current) {
      const rivzTop = rivzMeaningRef.current.getBoundingClientRect().top + window.scrollY
      if (scrollPosition > rivzTop) {
        rivzMeaningRef.current.classList.add("is-visible")
      }
    }

    // RIVZ文字（遅延表示）
    rivzLetterRefs.current.forEach((letter, index) => {
      if (letter) {
        const letterTop = letter.getBoundingClientRect().top + window.scrollY
        if (scrollPosition > letterTop) {
          setTimeout(() => {
            letter.classList.add("is-visible")
          }, 200 * index) // 遅延時間を調整
        }
      }
    })

    // サービスセクション
    serviceRefs.current.forEach((section, index) => {
      if (section) {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY
        if (scrollPosition > sectionTop) {
          section.classList.add("is-visible")

          // サービスセクション内の画像と詳細も表示
          const imageElement = section.querySelector(".service-image")
          const detailsElement = section.querySelector(".service-details")

          if (imageElement) {
            imageElement.classList.add("is-visible")
          }

          if (detailsElement) {
            detailsElement.classList.add("is-visible")
          }
        }
      }
    })

    // 無料相談セクション
    if (consultationRef.current) {
      const consultationTop = consultationRef.current.getBoundingClientRect().top + window.scrollY
      if (scrollPosition > consultationTop) {
        consultationRef.current.classList.add("is-visible")
      }
    }

    // ステップカード（遅延表示）
    stepCardRefs.current.forEach((card, index) => {
      if (card) {
        const cardTop = card.getBoundingClientRect().top + window.scrollY
        if (scrollPosition > cardTop) {
          setTimeout(() => {
            card.classList.add("is-visible")
          }, 100 * index) // 遅延時間を短縮
        }
      }
    })

    // 会社概要セクション
    if (companyRef.current) {
      const companyTop = companyRef.current.getBoundingClientRect().top + window.scrollY
      if (scrollPosition > companyTop) {
        companyRef.current.classList.add("is-visible")

        // 会社概要内の画像と詳細も表示
        const imageElement = companyRef.current.querySelector(".company-image")
        const detailsElement = companyRef.current.querySelector(".company-details")

        if (imageElement) {
          imageElement.classList.add("is-visible")
        }

        if (detailsElement) {
          detailsElement.classList.add("is-visible")
        }
      }
    }

    // お問い合わせセクション
    if (contactRef.current) {
      const contactTop = contactRef.current.getBoundingClientRect().top + window.scrollY
      if (scrollPosition > contactTop) {
        contactRef.current.classList.add("is-visible")

        // お問い合わせ内の要素も表示
        const infoElement = contactRef.current.querySelector(".contact-info")
        const formElement = contactRef.current.querySelector(".contact-form")

        if (infoElement) {
          infoElement.classList.add("is-visible")
        }

        if (formElement) {
          formElement.classList.add("is-visible")
        }
      }
    }
  }

  // useEffectの処理を強化
  useEffect(() => {
    window.addEventListener("scroll", checkScroll)

    // 初期表示時にもチェック（setTimeout を使って確実に要素が描画された後に実行）
    setTimeout(() => {
      checkScroll()

      // 初期表示時に画面内に入っている要素を強制的に表示
      const forceVisibleElements = document.querySelectorAll(
        ".fade-in-section, .slide-in-left, .slide-in-right, .scale-in, .stagger-item",
      )
      forceVisibleElements.forEach((element) => {
        const rect = element.getBoundingClientRect()
        if (rect.top < window.innerHeight) {
          element.classList.add("is-visible")
        }
      })
    }, 100)

    // ヒーロー画像のスライドショー
    const slideInterval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length)
    }, 4000) // 4秒ごとに画像を切り替え

    return () => {
      window.removeEventListener("scroll", checkScroll)
      clearInterval(slideInterval) // コンポーネントのアンマウント時にインターバルをクリア
    }
  }, [])

  return (
    <div className="website-container">
      <header>
        <div className="header-top">
          <p>
            関西エリア全域の遺品整理・金ブランド品買取・不動産売却支援は合同会社RIVZへお任せください。ワンストップで丸ごとサポートいたします。
          </p>
        </div>
        <div className="header-main">
          <div className="logo-container">
            <div className="logo-icon">
              <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                <polygon points="25,5 45,15 45,35 25,45 5,35 5,15" fill="#1a3a6c" />
              </svg>
            </div>
            <div className="logo-text">
              <h1>RIVZ</h1>
              <p>合同会社RIVZ</p>
            </div>
          </div>
          
          {/* PC用ナビゲーション */}
          <nav className="desktop-nav">
            <ul>
              <li>
                <a href="#">初めての方はこちら</a>
              </li>
              <li>
                <a href="#">料金</a>
              </li>
              <li>
                <a href="#">サービス内容</a>
              </li>
              <li>
                <a href="#">作業実績</a>
              </li>
              <li>
                <a href="#">お客様の声</a>
              </li>
              <li>
                <a href="#">対応エリア</a>
              </li>
              <li>
                <a href="#">当社について</a>
              </li>
            </ul>
          </nav>
          
          <div className="header-right">
            <div className="contact-button">
              <a href="#contact-form" className="free-consultation">
                無料お見積り
              </a>
            </div>
            
            {/* ハンバーガーメニューボタン */}
            <button 
              className="hamburger-menu"
              onClick={toggleMobileMenu}
              aria-label="メニューを開く"
            >
              <span className={`hamburger-line ${isMobileMenuOpen ? 'active' : ''}`}></span>
              <span className={`hamburger-line ${isMobileMenuOpen ? 'active' : ''}`}></span>
              <span className={`hamburger-line ${isMobileMenuOpen ? 'active' : ''}`}></span>
            </button>
          </div>
        </div>
        
        {/* モバイル用ドロワーメニュー */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-overlay" onClick={closeMobileMenu}></div>
          <div className="mobile-menu-content">
            <div className="mobile-menu-header">
              <div className="mobile-logo">
                <div className="logo-icon">
                  <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="25,5 45,15 45,35 25,45 5,35 5,15" fill="#1a3a6c" />
                  </svg>
                </div>
                <div className="logo-text">
                  <h2>RIVZ</h2>
                  <p>合同会社RIVZ</p>
                </div>
              </div>
              <button 
                className="close-menu"
                onClick={closeMobileMenu}
                aria-label="メニューを閉じる"
              >
                ×
              </button>
            </div>
            <nav className="mobile-nav">
              <ul>
                <li>
                  <a href="#" onClick={closeMobileMenu}>初めての方はこちら</a>
                </li>
                <li>
                  <a href="#" onClick={closeMobileMenu}>料金</a>
                </li>
                <li>
                  <a href="#" onClick={closeMobileMenu}>サービス内容</a>
                </li>
                <li>
                  <a href="#" onClick={closeMobileMenu}>作業実績</a>
                </li>
                <li>
                  <a href="#" onClick={closeMobileMenu}>お客様の声</a>
                </li>
                <li>
                  <a href="#" onClick={closeMobileMenu}>対応エリア</a>
                </li>
                <li>
                  <a href="#" onClick={closeMobileMenu}>当社について</a>
                </li>
              </ul>
            </nav>
            <div className="mobile-menu-cta">
              <a href="#contact-form" className="mobile-consultation-button" onClick={closeMobileMenu}>
                無料お見積り
              </a>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="hero-section" ref={heroSectionRef}>
          <div className="hero-background">
            {heroImages.map((src, index) => (
              <div key={src} className={`hero-image-slide ${index === currentHeroImage ? "active" : ""}`}>
                <Image
                  src={src || "/placeholder.svg"}
                  alt={`ヒーロー画像 ${index + 1}`}
                  fill
                  priority={index === 0}
                  className="hero-bg-image"
                />
              </div>
            ))}
            <div className="hero-overlay"></div>
          </div>
          <div className="hero-content">
            <div className="hero-text-container">
              <div className="hero-text">
                <h2>関西で選ばれ続ける理由がある</h2>
                <div className="main-title">
                  <h1>
                    <span className="service-line">物にも第二の人生を</span>
                    <span className="service-line">ワンストップ遺品整理</span>
                  </h1>
                </div>
                <a href="#contact-form" className="service-button">
                  無料お見積り
                </a>

                <div className="phone-container">
                  <div className="phone-icon">
                    <div className="icon-circle">
                      <svg viewBox="0 0 24 24" width="20" height="20">
                        <path
                          d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1.02 1.02 0 0 0-1.02.24l-2.2 2.2a15.045 15.045 0 0 1-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM19 12h2a9 9 0 0 0-9-9v2c3.87 0 7 3.13 7 7zm-4 0h2c0-2.76-2.24-5-5-5v2c1.66 0 3 1.34 3 3z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="phone-info">
                    <p>年中無休・9:00〜18:00</p>
                    <a href="tel:0120-763-673" className="phone-number-button">
                      0120-763-673
                    </a>
                    <p className="reception-hours">info.rivz@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="hero-badge">
              <div className="award-badge">
                <div className="badge-content">
                  <div className="stars">★★★</div>
                  <p>自社一気通貫</p>
                  <p>丸ごと</p>
                  <div className="number-one">サポート</div>
                  <div className="award-text">遺品整理×買取×不動産</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2つ目のセクション - オーバーラップするデザイン */}
        <div className="service-overview-section">
          <div className="service-overview-container" ref={serviceOverviewRef}>
            <div className="service-images-background">
              <Image
                src="/images/staff01.png"
                alt="遺品整理スタッフ"
                width={1200}
                height={800}
                className="staff-bg-image"
              />
              <div className="overlay"></div>
            </div>

            <div className="service-content-overlay">
              <div className="service-title-area">
                <div className="service-title-button">
                  <span>ワンストップ遺品整理のRIVZについて</span>
                </div>

                <div className="service-certification">
                  <div className="laurel-left">
                    <svg viewBox="0 0 50 50" width="30" height="30">
                      <path
                        d="M25,2C12.3,2,2,12.3,2,25s10.3,23,23,23s23-10.3,23-23S37.7,2,25,2z M25,40c-8.3,0-15-6.7-15-15s6.7-15,15-15s15,6.7,15,15 S33.3,40,25,40z"
                        fill="#d4bb89"
                      />
                    </svg>
                  </div>
                  <div className="certification-text">
                    <p>関西エリア全域</p>
                    <p className="cert-highlight">対応可能</p>
                  </div>
                  <div className="laurel-right">
                    <svg viewBox="0 0 50 50" width="30" height="30">
                      <path
                        d="M25,2C12.3,2,2,12.3,2,25s10.3,23,23,23s23-10.3,23-23S37.7,2,25,2z M25,40c-8.3,0-15-6.7-15-15s6.7-15,15-15s15,6.7,15,15 S33.3,40,25,40z"
                        fill="#d4bb89"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="service-main-content">
                <h2 className="service-main-title">業界経験豊富な専門家による</h2>
                <h2 className="service-highlight-title">確かな目利きで資産へ</h2>
                <h2 className="service-main-title">
                  買取は高く、処分は安く<span className="dot"></span>
                </h2>

                <div className="service-description">
                  <p>
                    立ち合いができない遠方からのご依頼も承ります。
                    <br />
                    <br />
                    故人様のご遺品を高価買取することで資産に変換し、10年以上の専門家による正確な査定で、隠れ資産の発見と適正評価を行います。
                  </p>
                </div>

                <div className="floating-images">
                  <div className="floating-image antique-image">
                    <Image src="/images/parts02.png" alt="骨董品" width={200} height={200} />
                  </div>

                  <div className="floating-image staff-work-image">
                    <Image src="/images/parts02.png" alt="作業スタッフ" width={200} height={250} />
                  </div>

                  <div className="decoration-image leaf1">
                    <Image src="/images/parts03.png" alt="装飾" width={80} height={80} />
                  </div>

                  <div className="decoration-image leaf2">
                    <Image src="/images/parts04.png" alt="装飾" width={80} height={80} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 不動産買取セクション */}
        <div className="real-estate-section fade-in-section" ref={realEstateRef}>
          <div className="real-estate-container">
            <div className="real-estate-grid">
              <div className="real-estate-image left-image">
                <Image src="/images/staff04.png" alt="不動産売却支援スタッフ" width={500} height={500} />
              </div>

              <div className="real-estate-content">
                <div className="real-estate-header">
                  <div className="fee-badge">リサイクル文化の普及</div>
                  <div className="condition-text">SDGsを意識した循環型社会への貢献</div>
                </div>

                <div className="real-estate-title">
                  <h2>物を通して人の笑顔が溢れる</h2>
                  <h2 className="highlight">持続可能な未来へ</h2>
                </div>

                <div className="real-estate-description">
                  <p>古くてもボロボロでも買取いたします。</p>
                  <p>破れていたり汚れている物、</p>
                  <p>壊れている電化製品、ひび割れや欠けた食器など、</p>
                  <p>&nbsp;</p>
                  <p>どんな状態でも対応可能です。</p>
                  <p>商品によってはビンテージや<br className="mobile-break" />アンティークとして価値が上がることも。</p>
                </div>

                <div className="real-estate-button-container">
                  <a href="#contact-form" className="real-estate-button">
                    詳しくはこちら
                    <span className="button-arrow">›</span>
                  </a>
                </div>
              </div>

              <div className="real-estate-image right-image">
                <Image src="/images/parts11.png" alt="リノベーション物件" width={500} height={500} />
              </div>
            </div>
          </div>
        </div>

        {/* 新セクション1: 遺品整理・生前整理・清掃サービス */}
        <div
          id="services"
          className="service-section life-organizing-section fade-in-section"
          ref={(el) => (serviceRefs.current[0] = el)}
        >
          <div className="service-container">
            <div className="service-header">
              <h2 className="service-title">遺品整理・生前整理・清掃</h2>
              <p className="service-subtitle">故人様のお宅にある物全てに対応可能です</p>
            </div>

            <div className="service-content">
              <div className="service-image slide-in-left">
                <Image src="/images/parts07.png" alt="遺品整理の様子" width={600} height={600} />
              </div>

              <div className="service-details slide-in-right">
                <div className="service-point">
                  <div className="point-number">01</div>
                  <h3>生活用品・雑貨・思い出の品まで</h3>
                  <p>
                    ありとあらゆる物の整理や買取をいたします。大型家具の搬出や物置の撤去など、大がかりな作業も対応します。立ち会えない場合でも、身分証明書の写しと委任状をいただき作業いたします。
                  </p>
                </div>

                <div className="service-point">
                  <div className="point-number">02</div>
                  <h3>作業前後の様子を写真・動画で確認</h3>
                  <p>立ち会いができない遠方のお客様でも安心。作業前後の様子はビデオや写真でご確認いただけます。</p>
                </div>

                <div className="service-point">
                  <div className="point-number">03</div>
                  <h3>幅広い品目に対応</h3>
                  <p>
                    服・鞄・靴、電化製品、小物・雑貨、テレビ・プリンタ・パソコン、食器・花瓶・置物、ミシン・腕時計・アクセサリー、箱物贈答品、家具・家電、ブランド物・貴金属、骨董品・アンティークまで対応。
                  </p>
                </div>

                <div className="service-cta">
                  <a href="#contact-form" className="service-button">
                    無料相談を予約する
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 新セクション2: 金・プラチナ・貴金属・ブランド品買取 */}
        <div
          className="service-section special-cleaning-section fade-in-section"
          ref={(el) => (serviceRefs.current[1] = el)}
        >
          <div className="service-container">
            <div className="service-header">
              <h2 className="service-title">その場で現金化が可能</h2>
              <p className="service-subtitle">WEB予約、お電話、LINEから受付中</p>
            </div>

            <div className="service-content reverse">
              <div className="service-image slide-in-right">
                <Image src="/images/parts17.png" alt="ブランド品買取の様子" width={600} height={600} />
              </div>

              <div className="service-details slide-in-left">
                <div className="service-point">
                  <div className="point-number">01</div>
                  <h3>最短期日でご自宅へ訪問</h3>
                  <p>
                    担当査定員がすぐに訪問いたします。個人情報は訪問以外に使用しません。出張料や査定料、見積もり料などに関して、お客様からお金をいただくことはありません。
                  </p>
                </div>

                <div className="service-point">
                  <div className="point-number">02</div>
                  <h3>わかりやすく、丁寧に、素早く査定</h3>
                  <p>
                    どんな些細なことでも質問可能です。査定員1人がその場で運べない物は後日引き取りとなる可能性があります。
                  </p>
                </div>

                <div className="service-point">
                  <div className="point-number">03</div>
                  <h3>その場で現金支払い</h3>
                  <p>
                    現金、銀行振込、PayPayでのお支払いが可能です。再販が難しく買取金額が付かない品物の場合は、無料回収や提携先業者のご紹介も行います。
                  </p>
                </div>

                <div className="service-cta">
                  <a href="#contact-form" className="service-button">
                    無料査定を依頼する
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 無料相談セクション */}
        <div className="consultation-section fade-in-section" ref={consultationRef}>
          <div className="consultation-container">
            <div className="consultation-header">
              <h2 className="consultation-title">無料相談・お見積り</h2>
              <p className="consultation-subtitle">お客様のご要望に合わせた最適なプランをご提案します</p>
            </div>

            <div className="consultation-steps">
              <div className="step-card stagger-item" ref={(el) => (stepCardRefs.current[0] = el)}>
                <div className="step-number">STEP 1</div>
                <div className="step-image">
                  <Image src="/images/utiawase05.png" alt="お問い合わせ" width={300} height={300} />
                </div>
                <h3 className="step-title">無料でご相談・お問い合わせ</h3>
                <p className="step-description">
                  WEB予約フォーム、お電話、LINEから受付しています。出張買取は完全予約制となっております。
                </p>
              </div>

              <div className="step-card stagger-item" ref={(el) => (stepCardRefs.current[1] = el)}>
                <div className="step-number">STEP 2</div>
                <div className="step-image">
                  <Image src="/images/utiawase02.png" alt="現地調査" width={300} height={300} />
                </div>
                <h3 className="step-title">最短期日でご自宅へ訪問</h3>
                <p className="step-description">担当査定員がすぐに訪問いたします。個人情報は訪問以外に使用しません。</p>
              </div>

              <div className="step-card stagger-item" ref={(el) => (stepCardRefs.current[2] = el)}>
                <div className="step-number">STEP 3</div>
                <div className="step-image">
                  <Image src="/images/utiawase07.png" alt="作業日決定" width={300} height={300} />
                </div>
                <h3 className="step-title">無料お見積もり</h3>
                <p className="step-description">
                  わかりやすく、丁寧に、素早く査定いたします。どんな些細なことでも質問可能です。
                </p>
              </div>

              <div className="step-card stagger-item" ref={(el) => (stepCardRefs.current[3] = el)}>
                <div className="step-number">STEP 4</div>
                <div className="step-image">
                  <Image src="/images/utiawase04.png" alt="作業完了" width={300} height={300} />
                </div>
                <h3 className="step-title">査定完了、お支払い</h3>
                <p className="step-description">その場で現金支払い。現金、銀行振込、PayPayでのお支払いが可能です。</p>
              </div>
            </div>

            <div className="consultation-cta">
              <a href="#contact-form" className="consultation-button">
                無料相談を予約する
              </a>
            </div>
          </div>
        </div>

        {/* 会社概要セクション */}
        <div id="company" className="company-section fade-in-section" ref={companyRef}>
          <div className="company-container">
            <div className="company-header">
              <h2 className="company-title">会社概要</h2>
              <p className="company-subtitle">ワンストップで丸ごとサポート</p>
            </div>

            <div className="company-content">
              <div className="company-image scale-in">
                <Image src="/images/staff02.png" alt="会社スタッフ" width={500} height={500} />
              </div>

              <div className="company-details scale-in">
                <table className="company-table">
                  <tbody>
                    <tr>
                      <th>会社名</th>
                      <td>合同会社RIVZ（リヴズ）</td>
                    </tr>
                    <tr>
                      <th>代表者</th>
                      <td>福永凌</td>
                    </tr>
                    <tr>
                      <th>設立</th>
                      <td>2025年5月</td>
                    </tr>
                    <tr>
                      <th>所在地</th>
                      <td>〒531-0072 大阪市北区豊崎5丁目7-15</td>
                    </tr>
                    <tr>
                      <th>事業内容</th>
                      <td>遺品整理、生前整理、金・ブランド品買取、不動産売却支援等</td>
                    </tr>
                    <tr>
                      <th>営業時間</th>
                      <td>9:00〜18:00（年中無休）</td>
                    </tr>
                    <tr>
                      <th>対応エリア</th>
                      <td>関西エリア全域（大阪府、兵庫県、京都府、奈良県、和歌山県）</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* RIVZの意味セクション */}
        <div className="rivz-meaning-section fade-in-section" ref={rivzMeaningRef}>
          <div className="rivz-meaning-container">
            <div className="rivz-background-text">RIVZ</div>

            <div className="rivz-content">
              <div className="rivz-header">
                <h2 className="rivz-main-title">
                  想いを整え、価値に変え、<br className="mobile-break" />未来へつなぐ
                </h2>
                <p className="rivz-subtitle">社名に込めた想い</p>
              </div>

              <div className="rivz-letters">
                <div className="rivz-letter-card stagger-item" ref={(el) => (rivzLetterRefs.current[0] = el)}>
                  <div className="letter-symbol">R</div>
                  <div className="letter-content">
                    <h3>Respect / Recycle</h3>
                    <p>想いを尊重し再び活かす</p>
                  </div>
                </div>

                <div className="rivz-letter-card stagger-item" ref={(el) => (rivzLetterRefs.current[1] = el)}>
                  <div className="letter-symbol">I</div>
                  <div className="letter-content">
                    <h3>Inheritance</h3>
                    <p>相続・承継の架け橋</p>
                  </div>
                </div>

                <div className="rivz-letter-card stagger-item" ref={(el) => (rivzLetterRefs.current[2] = el)}>
                  <div className="letter-symbol">V</div>
                  <div className="letter-content">
                    <h3>Value</h3>
                    <p>価値の再発見と創出</p>
                  </div>
                </div>

                <div className="rivz-letter-card stagger-item" ref={(el) => (rivzLetterRefs.current[3] = el)}>
                  <div className="letter-symbol">Z</div>
                  <div className="letter-content">
                    <h3>Zero to New</h3>
                    <p>ゼロから新たな未来へ</p>
                  </div>
                </div>
              </div>

              <div className="rivz-philosophy">
                <div className="philosophy-quote">
                  <p className="quote-text">
                    "遺品"から始まり、<br className="mobile-break" />"不動産"をつなぎ、"価値"へ変える
                  </p>
                </div>

                <div className="philosophy-description">
                  <p>
                    「物にも第二の人生を」をコンセプトに、リサイクル文化の普及と物の再生を通して、物を通して人の笑顔が溢れる世界を目指しています。
                    <br />
                    <br />
                    RIVZはただの片付け屋ではありません。
                    <br />
                    ご家族の想いが詰まった空間を丁寧に整理し、不要となったものには新たな命を与え、
                    <br />
                    空き家や相続不動産は"資産"として次の世代に渡していく。
                    <br />
                    社会課題の解決にもつながる「まるごとサポートモデル」を目指します。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* お問い合わせフォームセクション */}
        <div id="contact-form" className="contact-form-section fade-in-section" ref={contactRef}>
          <div className="contact-form-container">
            <div className="contact-form-header">
              <h2 className="contact-form-title">お問い合わせ</h2>
              <p className="contact-form-subtitle">ご質問・ご相談はお気軽に<br />お問い合わせください</p>
            </div>

            <div className="contact-form-content">
              <div className="contact-info slide-in-left">
                <div className="contact-methods">
                  <div className="contact-phone">
                    <h3>お電話でのお問い合わせ</h3>
                    <p className="contact-phone-number">0120-763-673</p>
                    <p className="contact-hours">受付時間: 9:00〜18:00（年中無休）</p>
                  </div>

                  <div className="contact-email">
                    <h3>メールでのお問い合わせ</h3>
                    <p className="contact-email-address">info.rivz@gmail.com</p>
                    <p className="contact-response">24時間以内に返信いたします</p>
                  </div>
                </div>

                <div className="contact-image">
                  <Image src="/images/staff03.png" alt="お問い合わせ" width={400} height={400} />
                </div>
              </div>

              <div className="contact-form slide-in-right">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">
                      お名前 <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="例：山田太郎"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">
                      お電話番号 <span className="required">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="例：090-1234-5678"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">
                      メールアドレス <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="例：yamada@example.com"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="address">
                      ご住所 <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="例：大阪市北区豊崎5丁目7-15"
                      required
                    />
                  </div>

                  {/* テキストエリアのrows属性を5から2に変更して高さを半分にします */}
                  <div className="form-group">
                    <label htmlFor="message">ご質問、ご相談内容</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={2}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="例：実家の遺品整理をお願いしたいのですが、どのような流れになりますでしょうか。また、貴重品の査定もお願いできますか？"
                    ></textarea>
                  </div>

                  <div className="form-privacy">
                    <p>
                      ※ご入力いただいた個人情報は、お問い合わせへの対応と、それに関連するサービスのご提供のみに利用いたします。
                    </p>
                  </div>

                  <div className="form-submit">
                    <button type="submit" className="submit-button">
                      無料お見積り
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <div className="footer-content">
          <div className="footer-info">
            <div className="footer-logo">
              <div className="logo-icon">
                <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="25,5 45,15 45,35 25,45 5,35 5,15" fill="#ffffff" />
                </svg>
              </div>
              <div className="logo-text">
                <h3>合同会社RIVZ</h3>
              </div>
            </div>

            <div className="footer-contact">
              <p>〒531-0072 大阪市北区豊崎5丁目7-15</p>
              <p>TEL: 0120-763-673（9:00〜18:00 年中無休）</p>
              <p>Email: info.rivz@gmail.com</p>
            </div>
          </div>

          <div className="footer-nav">
            <div className="footer-nav-column">
              <h4>サービス</h4>
              <ul>
                <li>
                  <a href="#">遺品整理</a>
                </li>
                <li>
                  <a href="#">生前整理</a>
                </li>
                <li>
                  <a href="#">金・ブランド品買取</a>
                </li>
                <li>
                  <a href="#">不動産売却支援</a>
                </li>
                <li>
                  <a href="#">デジタル遺品整理</a>
                </li>
              </ul>
            </div>

            <div className="footer-nav-column">
              <h4>会社情報</h4>
              <ul>
                <li>
                  <a href="#company">会社概要</a>
                </li>
                <li>
                  <a href="#">スタッフ紹介</a>
                </li>
                <li>
                  <a href="#">採用情報</a>
                </li>
                <li>
                  <a href="#">ブログ</a>
                </li>
              </ul>
            </div>

            <div className="footer-nav-column">
              <h4>お役立ち情報</h4>
              <ul>
                <li>
                  <a href="#">よくある質問</a>
                </li>
                <li>
                  <a href="#">整理のコツ</a>
                </li>
                <li>
                  <a href="#">相続の基礎知識</a>
                </li>
                <li>
                  <a href="#">お客様の声</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="copyright">
            <p>&copy; 2025 合同会社RIVZ All Rights Reserved.</p>
          </div>

          <div className="footer-links">
            <a href="#">プライバシーポリシー</a>
            <a href="#">特定商取引法に基づく表記</a>
            <a href="#">サイトマップ</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
