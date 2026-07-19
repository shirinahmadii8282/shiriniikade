import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getProducts } from '../services/api'

const toman = (v) => Number(v).toLocaleString('fa-IR') + ' تومان'

export default function Home() {
  const [featured, setFeatured] = useState([])
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    getProducts()
      .then(data => setFeatured(Array.isArray(data) ? data.slice(0, 4) : []))
      .catch(() => setFeatured([]))
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/products${search.trim() ? `?search=${encodeURIComponent(search.trim())}` : ''}`)
  }

  return (
    <>
      <header className="hero">
        <div className="container">
          <div className="hero-card p-4 p-lg-5">
            <div className="row align-items-center g-5">
              <div className="col-lg-6">
                <span className="badge-category mb-3">طعم تازه، سفارش ساده</span>
                <h1>سفارش آنلاین <span>کیک و شیرینی</span></h1>
                <p className="mt-3 mb-4">در شیرینی‌کده می‌توانید انواع کیک تولد، شیرینی تر، شیرینی خشک و دسر را مشاهده کنید و بدون نیاز به پرداخت آنلاین، سفارش خود را ثبت نمایید.</p>
                <form className="search-box mb-4" onSubmit={handleSearch}>
                  <input
                    type="search"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="جستجوی کیک، شیرینی یا دسر..."
                    aria-label="جستجوی محصول"
                  />
                  <button type="submit" aria-label="جستجو">🔍</button>
                </form>
                <div className="d-flex flex-wrap gap-2">
                  <Link to="/products" className="btn btn-primary-custom">مشاهده محصولات</Link>
                  <Link to="/order" className="btn btn-outline-custom">ثبت سفارش</Link>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="hero-image-wrap">
                  <img src="https://static.vecteezy.com/system/resources/thumbnails/068/235/265/small_2x/delicious-strawberry-cake-decoration-bakery-food-photography-indoor-top-view-dessert-inspiration-png.png" className="hero-cake" alt="کیک و شیرینی" />
                </div>
              </div>
            </div>
          </div>

          <div className="row g-3 mt-4">
            <div className="col-6 col-lg-3"><div className="stat-card"><strong>+۵۰</strong><span>محصول متنوع</span></div></div>
            <div className="col-6 col-lg-3"><div className="stat-card"><strong>۲۴ساعت</strong><span>ثبت سفارش ساده</span></div></div>
            <div className="col-6 col-lg-3"><div className="stat-card"><strong>تازه</strong><span>مواد اولیه باکیفیت</span></div></div>
            <div className="col-6 col-lg-3"><div className="stat-card"><strong>پخت خانگی</strong><span>سفارش ویژه</span></div></div>
          </div>
        </div>
      </header>

      <main>
        <section className="section-padding">
          <div className="container">
            <div className="text-center mb-4">
              <h2 className="section-title">محصولات ویژه</h2>
              <p className="section-subtitle">چند نمونه از محبوب‌ترین محصولات شیرینی‌کده برای سفارش سریع و ساده.</p>
            </div>
            <div className="row g-4">
              {featured.length === 0 ? (
                <div className="col-12 text-center text-muted py-4">در حال بارگذاری...</div>
              ) : featured.map(p => (
                <div className="col-12 col-sm-6 col-lg-3" key={p._id}>
                  <div className="product-card">
                    <Link to={`/products/${p._id}`}>
                      <img src={p.image} className="product-img" alt={p.title} />
                    </Link>
                    <div className="card-body">
                      <span className="badge-category mb-2">{p.category}</span>
                      <h5 className="fw-bold">{p.title}</h5>
                      <p className="price mb-3">{toman(p.price)}</p>
                      <Link to={`/products/${p._id}`} className="btn btn-outline-custom btn-sm w-100">مشاهده جزئیات</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-5">
              <Link to="/products" className="btn btn-primary-custom">مشاهده همه محصولات</Link>
            </div>
          </div>
        </section>

        <section className="section-padding bg-light">
          <div className="container">
            <div className="text-center mb-4">
              <h2 className="section-title">چرا شیرینی‌کده؟</h2>
              <p className="section-subtitle">هدف این پروژه ارائه یک تجربه ساده، سریع و قابل فهم برای سفارش کیک و شیرینی است.</p>
            </div>
            <div className="row g-4">
              <div className="col-md-4">
                <div className="feature-card">
                  <div className="feature-icon">🥐</div>
                  <h5 className="fw-bold">تنوع محصولات</h5>
                  <p className="text-muted mb-0">انواع کیک، شیرینی و دسر.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="feature-card">
                  <div className="feature-icon">🍰</div>
                  <h5 className="fw-bold">طعم خانگی و اصیل</h5>
                  <p className="text-muted mb-0">شیرینی های دست ساز با عطر و طعمی که یادآور شیرینی های خانگی است.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="feature-card">
                  <div className="feature-icon">📝</div>
                  <h5 className="fw-bold">ثبت سفارش ساده</h5>
                  <p className="text-muted mb-0">تنها در چند دقیقه سفارش خود را ثبت کنید، و باقی کار را به ما بسپارید.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container">
            <div className="text-center mb-4">
              <h2 className="section-title">نظرات مشتریان</h2>
             
            </div>
            <div className="row g-4">
              <div className="col-md-4"><div className="review-card"><div className="stars">★★★★★</div><h6 className="fw-bold mt-3">مریم احمدی</h6><p className="text-muted mb-0">کیک تولد بسیار تازه و خوش‌طعم بود. ثبت سفارش هم خیلی ساده انجام شد.</p></div></div>
              <div className="col-md-4"><div className="review-card"><div className="stars">★★★★★</div><h6 className="fw-bold mt-3">توحید مستخدمی</h6><p className="text-muted mb-0"> محصول مورد نظرم را سریع پیدا کردم.</p></div></div>
              <div className="col-md-4"><div className="review-card"><div className="stars">★★★★☆</div><h6 className="fw-bold mt-3">نگار کریمی</h6><p className="text-muted mb-0">سفارشم به سرعت بدستم رسید.</p></div></div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
