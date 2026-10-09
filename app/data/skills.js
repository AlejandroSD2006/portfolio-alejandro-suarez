import { Brain, Cloud, Database, Network, Server, Sigma, Terminal } from 'lucide-vue-next'
import {
  siAnsible,
  siCss,
  siGit,
  siHtml5,
  siJavascript,
  siLinux,
  siPython,
  siVmware,
  siVercel,
  siVuedotjs,
  siPandas,
  siWordpress,
} from 'simple-icons'

export const skillCategories = [
  { id: 'cloud', label: 'Cloud & Systems' },
  { id: 'data', label: 'Data & ML' },
  { id: 'web', label: 'Web & Dev' },
  { id: 'network', label: 'Networking' },
]

export const skills = [
  { id: 'vmware', name: 'VMware vSphere', category: 'cloud', icon: { kind: 'brand', data: siVmware }, usedIn: 'Private cloud · Kyndryl Granada' },
  { id: 'ansible', name: 'Ansible', category: 'cloud', icon: { kind: 'brand', data: siAnsible }, usedIn: 'CIS Benchmark Automation' },
  { id: 'windows-server', name: 'Windows Server', category: 'cloud', icon: { kind: 'lucide', component: Server }, usedIn: 'CIS Benchmark Automation' },
  { id: 'linux', name: 'Linux', category: 'cloud', icon: { kind: 'brand', data: siLinux } },
  { id: 'powershell', name: 'PowerShell', category: 'cloud', icon: { kind: 'lucide', component: Terminal } },
  { id: 'vercel', name: 'Vercel', category: 'cloud', icon: { kind: 'brand', data: siVercel } },
  { id: 'aws', name: 'AWS', category: 'cloud', icon: { kind: 'lucide', component: Cloud } },
  { id: 'python', name: 'Python', category: 'data', icon: { kind: 'brand', data: siPython } },
  { id: 'sql', name: 'SQL', category: 'data', icon: { kind: 'lucide', component: Database } },
  { id: 'machine-learning', name: 'Machine Learning', category: 'data', icon: { kind: 'lucide', component: Brain }, status: 'in-progress' },
  { id: 'pandas', name: 'Pandas', category: 'data', icon: { kind: 'brand', data: siPandas } },
  { id: 'pymath', name: 'PyMath', category: 'data', icon: { kind: 'lucide', component: Sigma } },
  { id: 'git', name: 'Git', category: 'web', icon: { kind: 'brand', data: siGit } },
  { id: 'html-css-js', name: 'HTML / CSS / JS', category: 'web', icon: { kind: 'multi', items: [siHtml5, siCss, siJavascript] } },
  { id: 'wordpress', name: 'WordPress', category: 'web', icon: { kind: 'brand', data: siWordpress }, usedIn: 'Web Maintenance · Academia 10' },
  { id: 'vue', name: 'Vue', category: 'web', icon: { kind: 'brand', data: siVuedotjs } },
  { id: 'tcp-ip', name: 'TCP/IP', category: 'network', icon: { kind: 'lucide', component: Network } },
]

// TODO(alex): confirmar el nombre exacto de esta skill; si es NumPy o SymPy, cambiar el icono a siNumpy o siSympy (ambos existen)
// TODO(alex): confirmar si ya domina scikit-learn u otras librerías de datos/ML.
