import { EMAIL, PHONE, PHONE_DISPLAY } from '../data/services';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        {/* MASSIVE word-mark with gradient */}
        <div className="footer-mark" aria-hidden>
          <span className="gradient-text">Global<i>Fisio.</i></span>
        </div>

        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              Global Centre de Fisioteràpia
              <span>Sant Antoni de Calonge · Est. 2007</span>
            </div>
            <p>
              Fisioteràpia especialitzada millorant la qualitat
              de vida dels nostres pacients des de fa 17 anys.
            </p>
          </div>
          <div className="footer-col">
            <h5>Serveis</h5>
            <ul>
              <li><a href="#serveis">Traumatologia</a></li>
              <li><a href="#serveis">Esport</a></li>
              <li><a href="#serveis">Neurologia</a></li>
              <li><a href="#serveis">Geriatria</a></li>
              <li><a href="#serveis">Aquàtica</a></li>
              <li><a href="#serveis">Pilates</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Contacte</h5>
            <ul>
              <li><a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a></li>
              <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
              <li><a href="#contacte">Com arribar-hi</a></li>
              <li><a href="#horaris">Horaris</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Global Centre de Fisioteràpia</span>
          <span>Av. Torre Valentina, 13 · 17252 Calonge</span>
        </div>
      </div>
    </footer>
  );
}
