import React, { useState, useEffect } from 'react';
import {
  Mail,
  Send,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Inbox,
  UserCheck,
  ShieldCheck,
  ExternalLink,
  Clock,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import {
  getAccessToken,
  googleSignIn,
  auth,
  logout,
} from '../lib/firebase.ts';
import {
  sendEmailViaGmail,
  listGmailMessages,
  getGmailProfile,
  GmailMessageSummary,
  GmailProfile,
} from '../services/gmailApi.ts';
import { Booking } from '../types/index.ts';

interface GmailHubProps {
  bookings: Booking[];
  onBookingUpdated?: () => void;
}

export const GmailHub: React.FC<GmailHubProps> = ({ bookings, onBookingUpdated }) => {
  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [gmailProfile, setGmailProfile] = useState<GmailProfile | null>(null);
  const [messages, setMessages] = useState<GmailMessageSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [profileLoading, setProfileLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Quick Dispatch Modal State
  const [selectedBookingForDispatch, setSelectedBookingForDispatch] = useState<Booking | null>(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);
  const [customSubject, setCustomSubject] = useState<string>('');
  const [customRecipient, setCustomRecipient] = useState<string>('');
  const [customBody, setCustomBody] = useState<string>('');
  const [sendingEmail, setSendingEmail] = useState<boolean>(false);

  // Custom Direct Compose State
  const [directTo, setDirectTo] = useState<string>('');
  const [directSubject, setDirectSubject] = useState<string>('');
  const [directNotes, setDirectNotes] = useState<string>('');
  const [directConfirmOpen, setDirectConfirmOpen] = useState<boolean>(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = await getAccessToken();
      if (token) {
        setAccessTokenState(token);
        loadGmailData(token);
      }
    };
    checkToken();
  }, []);

  const handleGoogleConnect = async () => {
    setErrorMsg(null);
    setLoading(true);
    try {
      const res = await googleSignIn();
      if (res) {
        setCurrentUser(res.user);
        setAccessTokenState(res.accessToken);
        await loadGmailData(res.accessToken);
        setSuccessMsg('Gmail connected successfully!');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to authenticate with Google Gmail.');
    } finally {
      setLoading(false);
    }
  };

  const loadGmailData = async (token: string) => {
    setProfileLoading(true);
    try {
      const profile = await getGmailProfile(token);
      setGmailProfile(profile);
      const list = await listGmailMessages(token, 'JD Electrical OR Booking', 15);
      setMessages(list);
    } catch (err: any) {
      console.error('Error fetching Gmail data:', err);
      // If token expired, clear
      if (err.message?.includes('401') || err.message?.includes('invalid_token')) {
        setAccessTokenState(null);
        setErrorMsg('Gmail session expired. Please reconnect with Google.');
      }
    } finally {
      setProfileLoading(false);
    }
  };

  const handleInitiateBookingDispatch = (b: Booking) => {
    setSelectedBookingForDispatch(b);
    setCustomRecipient(b.email || 'jaidykhan9@gmail.com');
    setCustomSubject(`JD MEP Engineering Dispatch Confirmation: ${b.bookingId} (${b.serviceTitle})`);
    setCustomBody(
      `Dear ${b.customerName},\n\n` +
      `This is an official dispatch confirmation from CEO Junaid Farooq at JD Electrical & Plumbing Services Mansehra.\n\n` +
      `Booking Reference: ${b.bookingId}\n` +
      `Service: ${b.serviceTitle} (${b.serviceCategory})\n` +
      `Scheduled Date: ${b.preferredDate} at ${b.preferredTime}\n` +
      `Dispatch Address: ${b.address}\n` +
      `Work Scope / Problem: ${b.problemDescription}\n` +
      `Payment Status: ${b.paymentStatus}\n\n` +
      `Our certified engineering technician will arrive on site with calibrated diagnostic tools.\n` +
      `Direct Helpline: 0302-1822160\n` +
      `WhatsApp: https://wa.me/923021822160\n\n` +
      `With regards,\n` +
      `Junaid Farooq\n` +
      `CEO & Principal Engineer, JD Services Mansehra`
    );
    setConfirmModalOpen(true);
  };

  const executeSendBookingDispatch = async () => {
    if (!accessToken || !selectedBookingForDispatch) return;
    setSendingEmail(true);
    setErrorMsg(null);
    try {
      const fromEmail = gmailProfile?.emailAddress || currentUser?.email || 'jaidykhan9@gmail.com';
      const formattedHtml = `
        <div style="font-family: Arial, sans-serif; background-color: #08090d; color: #f8fafc; padding: 24px; border-radius: 8px;">
          <div style="border-bottom: 2px solid #d4af37; padding-bottom: 12px; margin-bottom: 20px;">
            <h2 style="color: #fae8b4; margin: 0;">JD ELECTRICAL &amp; PLUMBING SERVICES</h2>
            <p style="color: #94a3b8; font-size: 12px; margin: 4px 0 0 0;">Official Dispatch Notice • Mansehra Operations • CEO Junaid Farooq</p>
          </div>
          <p style="font-size: 14px; line-height: 1.6; white-space: pre-line;">${customBody}</p>
          <div style="margin-top: 24px; padding: 16px; background-color: #121520; border-left: 4px solid #d4af37; font-size: 12px; color: #94a3b8;">
            <p style="margin: 0 0 4px 0;"><strong style="color: #fae8b4;">Emergency Helpline:</strong> 0302-1822160</p>
            <p style="margin: 0;"><strong style="color: #fae8b4;">Official Email:</strong> jaidykhan9@gmail.com</p>
          </div>
        </div>
      `;

      await sendEmailViaGmail(
        accessToken,
        fromEmail,
        customRecipient,
        customSubject,
        formattedHtml
      );

      setSuccessMsg(`Dispatch email for ${selectedBookingForDispatch.bookingId} successfully sent to ${customRecipient} via Gmail!`);
      setConfirmModalOpen(false);
      setSelectedBookingForDispatch(null);
      await loadGmailData(accessToken);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to send dispatch email through Gmail.');
    } finally {
      setSendingEmail(false);
    }
  };

  const executeDirectSend = async () => {
    if (!accessToken || !directTo.trim() || !directSubject.trim()) return;
    setSendingEmail(true);
    setErrorMsg(null);
    try {
      const fromEmail = gmailProfile?.emailAddress || currentUser?.email || 'jaidykhan9@gmail.com';
      const formattedHtml = `
        <div style="font-family: Arial, sans-serif; background-color: #08090d; color: #f8fafc; padding: 24px; border-radius: 8px;">
          <div style="border-bottom: 2px solid #d4af37; padding-bottom: 12px; margin-bottom: 20px;">
            <h2 style="color: #fae8b4; margin: 0;">JD ELECTRICAL &amp; PLUMBING SERVICES</h2>
            <p style="color: #94a3b8; font-size: 12px; margin: 4px 0 0 0;">Official Communications • Mansehra Operations • CEO Junaid Farooq</p>
          </div>
          <p style="font-size: 14px; line-height: 1.6; white-space: pre-line;">${directNotes}</p>
          <div style="margin-top: 24px; padding: 16px; background-color: #121520; border-left: 4px solid #d4af37; font-size: 12px; color: #94a3b8;">
            <p style="margin: 0 0 4px 0;"><strong style="color: #fae8b4;">Emergency Helpline:</strong> 0302-1822160</p>
            <p style="margin: 0;"><strong style="color: #fae8b4;">Official Email:</strong> jaidykhan9@gmail.com</p>
          </div>
        </div>
      `;

      await sendEmailViaGmail(
        accessToken,
        fromEmail,
        directTo.trim(),
        directSubject.trim(),
        formattedHtml
      );

      setSuccessMsg(`Direct email successfully sent to ${directTo}!`);
      setDirectConfirmOpen(false);
      setDirectTo('');
      setDirectSubject('');
      setDirectNotes('');
      await loadGmailData(accessToken);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to send message via Gmail.');
    } finally {
      setSendingEmail(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Integration Status */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0c0e15] to-[#121520] border border-[#d4af37]/35 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#d4af37]/15 border border-[#d4af37] flex items-center justify-center text-[#d4af37] shrink-0 shadow-lg">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-lg text-[#f8fafc]">
                  Gmail Workspace Dispatch Hub
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-700/50">
                  Google Workspace 1P API
                </span>
              </div>
              <p className="text-xs text-[#94a3b8] mt-1 max-w-xl leading-relaxed">
                Connect CEO Junaid Farooq’s official Google account (<strong className="text-[#fae8b4]">jaidykhan9@gmail.com</strong>) to dispatch branded work-orders, send direct engineering quotes, and inspect inbox logs in real-time.
              </p>
            </div>
          </div>

          <div>
            {accessToken && gmailProfile ? (
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs font-semibold text-[#f8fafc] flex items-center justify-end gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{gmailProfile.emailAddress}</span>
                  </div>
                  <div className="text-[11px] text-[#94a3b8]">
                    {gmailProfile.messagesTotal.toLocaleString()} messages in mailbox
                  </div>
                </div>
                <button
                  onClick={() => loadGmailData(accessToken)}
                  disabled={profileLoading}
                  className="p-2 rounded bg-white/5 hover:bg-white/10 text-[#94a3b8] hover:text-white transition-colors cursor-pointer"
                  title="Refresh Gmail Feed"
                >
                  <RefreshCw className={`w-4 h-4 ${profileLoading ? 'animate-spin text-[#d4af37]' : ''}`} />
                </button>
              </div>
            ) : (
              /* Official Google Sign-In Button style */
              <button
                onClick={handleGoogleConnect}
                disabled={loading}
                className="inline-flex items-center gap-3 px-5 py-2.5 bg-white hover:bg-neutral-100 text-neutral-900 rounded-lg text-xs font-bold transition-all shadow-md cursor-pointer hover:shadow-lg active:scale-98"
              >
                <svg className="w-4 h-4" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                </svg>
                <span>{loading ? 'Authorizing Gmail...' : 'Connect CEO Gmail (jaidykhan9@gmail.com)'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Notifications */}
        {errorMsg && (
          <div className="mt-4 p-3 rounded-lg bg-red-950/80 border border-red-700/60 text-xs text-red-200 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="mt-4 p-3 rounded-lg bg-emerald-950/80 border border-emerald-700/60 text-xs text-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{successMsg}</span>
            </div>
            <button onClick={() => setSuccessMsg(null)} className="text-white hover:text-emerald-300">×</button>
          </div>
        )}
      </div>

      {/* Grid: 1-Click Booking Dispatch + Direct Compose */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Col 1 & 2: Quick Booking Dispatch List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-display font-bold text-base text-[#f8fafc] flex items-center gap-2">
              <span>Ready for Gmail Dispatch</span>
              <span className="text-xs font-mono font-normal text-[#94a3b8]">({bookings.length} total orders)</span>
            </h4>
          </div>

          <div className="space-y-3">
            {bookings.slice(0, 8).map((b) => (
              <div
                key={b.id}
                className="p-4 rounded-xl bg-[#0e1017] border border-white/10 hover:border-[#d4af37]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-[#fae8b4]">{b.bookingId}</span>
                    <span className="text-xs font-semibold text-[#f8fafc]">{b.customerName}</span>
                    <span className="text-[11px] text-[#94a3b8]">({b.email || 'No email'})</span>
                  </div>
                  <div className="text-xs text-[#38bdf8] font-medium mt-1">
                    {b.serviceTitle}
                  </div>
                  <div className="text-[11px] text-[#64748b]">
                    Scheduled: {b.preferredDate} · {b.preferredTime} · {b.address}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => handleInitiateBookingDispatch(b)}
                    disabled={!accessToken}
                    className="px-3.5 py-1.5 bg-[#d4af37] hover:bg-[#fae8b4] text-[#08090d] text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Dispatch via Gmail</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Col 3: Direct Custom Mail Composer */}
        <div className="p-5 rounded-2xl bg-[#0e1017] border border-[#d4af37]/25 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
            <h4 className="font-display font-bold text-sm text-[#f8fafc]">
              Direct Client Notice Composer
            </h4>
          </div>
          <p className="text-xs text-[#94a3b8]">
            Send an official verified advisory or quotation directly from <strong className="text-[#fae8b4]">jaidykhan9@gmail.com</strong>.
          </p>

          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#94a3b8] mb-1 uppercase tracking-wider">
                Recipient Email
              </label>
              <input
                type="email"
                placeholder="client@example.com"
                value={directTo}
                onChange={(e) => setDirectTo(e.target.value)}
                className="w-full bg-[#121520] border border-white/10 rounded-lg p-2.5 text-xs text-[#f8fafc] focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#94a3b8] mb-1 uppercase tracking-wider">
                Subject
              </label>
              <input
                type="text"
                placeholder="MEP Maintenance Quote / Dispatch Alert"
                value={directSubject}
                onChange={(e) => setDirectSubject(e.target.value)}
                className="w-full bg-[#121520] border border-white/10 rounded-lg p-2.5 text-xs text-[#f8fafc] focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#94a3b8] mb-1 uppercase tracking-wider">
                Message Body
              </label>
              <textarea
                rows={5}
                placeholder="Enter technical quote, timeline, or instructions..."
                value={directNotes}
                onChange={(e) => setDirectNotes(e.target.value)}
                className="w-full bg-[#121520] border border-white/10 rounded-lg p-2.5 text-xs text-[#f8fafc] focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <button
              onClick={() => {
                if (!directTo.trim() || !directSubject.trim()) {
                  setErrorMsg('Please specify both recipient email and subject.');
                  return;
                }
                setDirectConfirmOpen(true);
              }}
              disabled={!accessToken}
              className="w-full py-2.5 bg-gradient-to-r from-[#fae8b4] via-[#d4af37] to-[#aa820a] text-[#08090d] font-bold text-xs rounded-lg uppercase tracking-wider transition-all hover:brightness-110 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Review &amp; Send Message
            </button>
          </div>
        </div>

      </div>

      {/* Recent Gmail Inbox Logs */}
      {accessToken && (
        <div className="p-5 rounded-2xl bg-[#0e1017] border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Inbox className="w-4 h-4 text-[#38bdf8]" />
              <h4 className="font-display font-bold text-sm text-[#f8fafc]">
                Recent Gmail Threads &amp; Inquiries
              </h4>
            </div>
            <span className="text-[11px] text-[#94a3b8]">Live query: &quot;JD Electrical OR Booking&quot;</span>
          </div>

          {messages.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#94a3b8] border border-dashed border-white/10 rounded-xl">
              No recent messages matched query. All dispatches will populate here automatically.
            </div>
          ) : (
            <div className="space-y-2">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className="p-3 rounded-lg bg-[#121520] border border-white/5 flex items-center justify-between gap-4 text-xs"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#fae8b4] truncate">{m.from || 'Google Workspace'}</span>
                      <span className="text-[10px] text-[#64748b] truncate">{m.date}</span>
                    </div>
                    <div className="font-medium text-[#f8fafc] truncate mt-0.5">{m.subject || '(No Subject)'}</div>
                    <div className="text-[11px] text-[#94a3b8] truncate">{m.snippet}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* MANDATORY EXPLICIT CONFIRMATION DIALOG FOR BOOKING DISPATCH */}
      {confirmModalOpen && selectedBookingForDispatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#0e1017] border border-[#d4af37] rounded-xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#d4af37]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-[#f8fafc]">
                  Confirm Gmail Dispatch Execution
                </h3>
                <div className="text-[11px] text-[#fae8b4]">
                  Permission required before sending on behalf of CEO Junaid Farooq
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-[#121520] border border-white/10 space-y-2 text-xs">
              <div>
                <span className="text-[#94a3b8]">From:</span>{' '}
                <strong className="text-[#fae8b4]">{gmailProfile?.emailAddress || 'jaidykhan9@gmail.com'}</strong>
              </div>
              <div>
                <span className="text-[#94a3b8]">To:</span>{' '}
                <strong className="text-white">{customRecipient}</strong>
              </div>
              <div>
                <span className="text-[#94a3b8]">Subject:</span>{' '}
                <span className="text-[#f8fafc]">{customSubject}</span>
              </div>
              <div>
                <span className="text-[#94a3b8]">Booking:</span>{' '}
                <span className="text-white font-mono">{selectedBookingForDispatch.bookingId}</span>
              </div>
            </div>

            <p className="text-xs text-[#94a3b8] leading-relaxed">
              Are you sure you want to dispatch this email to <strong className="text-white">{customRecipient}</strong>? This will create and send an official email message directly from your Gmail account.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setConfirmModalOpen(false)}
                disabled={sendingEmail}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-[#94a3b8] text-xs font-semibold rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={executeSendBookingDispatch}
                disabled={sendingEmail}
                className="px-5 py-2 bg-[#d4af37] hover:bg-[#fae8b4] text-[#08090d] text-xs font-bold rounded-lg cursor-pointer flex items-center gap-1.5 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{sendingEmail ? 'Transmitting via Gmail...' : 'Confirm & Dispatch Email'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MANDATORY EXPLICIT CONFIRMATION DIALOG FOR DIRECT NOTICE */}
      {directConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#0e1017] border border-[#d4af37] rounded-xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#d4af37]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-[#f8fafc]">
                  Confirm Direct Client Email
                </h3>
                <div className="text-[11px] text-[#fae8b4]">
                  Permission required before sending on behalf of CEO Junaid Farooq
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-[#121520] border border-white/10 space-y-2 text-xs">
              <div>
                <span className="text-[#94a3b8]">Recipient:</span>{' '}
                <strong className="text-white">{directTo}</strong>
              </div>
              <div>
                <span className="text-[#94a3b8]">Subject:</span>{' '}
                <span className="text-[#f8fafc]">{directSubject}</span>
              </div>
            </div>

            <p className="text-xs text-[#94a3b8] leading-relaxed">
              Confirm sending this message to <strong className="text-white">{directTo}</strong> from your authenticated Gmail account.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDirectConfirmOpen(false)}
                disabled={sendingEmail}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-[#94a3b8] text-xs font-semibold rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={executeDirectSend}
                disabled={sendingEmail}
                className="px-5 py-2 bg-[#d4af37] hover:bg-[#fae8b4] text-[#08090d] text-xs font-bold rounded-lg cursor-pointer flex items-center gap-1.5 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{sendingEmail ? 'Sending...' : 'Confirm & Send Email'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
