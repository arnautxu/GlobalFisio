import { useState } from 'react';
import { ADDRESS, EMAIL, PHONE, PHONE_DISPLAY } from '../data/services';
import './Contacte.css';

export default function Contacte() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => { setSent(false); (e.target as HTMLFormElement).reset(); }, 3000);
  };

  return (
    <section id="contacte" className="section contacte">
      <div className="container contacte-grid">
        <div>
          <span className="eyebrow">On som</span>
          <h2 className="contacte-title">Vine a visitar-nos</h2>

          <ul className="contact-list">
            <li>
              <div className="contact-icon"><PinIcon /></div>
              <div>
                <h5>Adreça</h5>
                <p>{ADDRESS}</p>
              </div>
            </li>
            <li>
              <div className="contact-icon"><PhoneIcon /></div>
              <div>
                <h5>Telèfon</h5>
                <a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a>
              </div>
            </li>
            <li>
              <div className="contact-icon"><MailIcon /></div>
              <div>
                <h5>Correu</h5>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </div>
            </li>
            <li>
              <div className="contact-icon"><ClockIcon /></div>
              <div>
                <h5>Horari</h5>
                <p>Dl–Dv 9:00–20:00 · Dissabte matí amb cita</p>
              </div>
            </li>
          </ul>

          <div className="map-wrap">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2978.5!2d3.0668!3d41.8547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12bb1c3f8b0e7a5b%3A0x1!2sAv.+Torre+Valentina%2C+13%2C+17252+Sant+Antoni+de+Calonge!5e0!3m2!1sca!2ses!4v1234567890"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa Global Centre de Fisioteràpia"
            />
            <div className="map-overlay" />
          </div>
        </div>

        <form className="contact-form" onSubmit={onSubmit}>
          <p className="form-title">Envia'ns un missatge</p>
          <div className="form-row">
            <Field label="Nom" id="nom" required autoComplete="given-name" />
            <Field label="Cognom" id="cognom" autoComplete="family-name" />
          </div>
          <Field label="Telèfon" id="tel" type="tel" autoComplete="tel" />
          <Field label="Correu electrònic" id="email" type="email" required autoComplete="email" />
          <div className="form-group">
            <label htmlFor="servei">Servei d'interès</label>
            <select id="servei" name="servei">
              <option value="">Selecciona un servei...</option>
              <option>Fisioteràpia Traumatològica</option>
              <option>Fisioteràpia Esportiva</option>
              <option>Fisioteràpia Neurològica</option>
              <option>Fisioteràpia Aquàtica</option>
              <option>Fisioteràpia Geriàtrica</option>
              <option>Fisioteràpia Pediàtrica</option>
              <option>Fisioteràpia ATM</option>
              <option>Massoteràpia</option>
              <option>Fisioteràpia a Domicili</option>
              <option>Escola d'Esquena / Pilates</option>
              <option>No sé, necessito orientació</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="msg">Missatge</label>
            <textarea id="msg" name="msg" rows={4} placeholder="Explica'ns breument la teva situació..." />
          </div>
          <button type="submit" className="btn btn-primary form-btn" disabled={sent}>
            {sent ? '✓ Missatge enviat!' : 'Enviar missatge →'}
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({ label, id, type = 'text', ...props }: any) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} type={type} {...props} />
    </div>
  );
}

const PinIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>;
const PhoneIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.08 3.4 2 2 0 0 1 3.05 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.05a16 16 0 0 0 5.86 5.86l1.21-1.21a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/></svg>;
const MailIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>;
const ClockIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>;
