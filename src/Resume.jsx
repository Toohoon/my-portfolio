import { Link } from 'react-router-dom'
import './Resume.css'

function Resume() {
  return (
    <div className="resume-container">
      <h1 className="resume-title">我的简历</h1>

      <div className="resume-card">
        <div className="resume-grid">
          <div className="resume-item"><span className="label">姓名：</span> 郑斗薰</div>
          <div className="resume-item"><span className="label">身份：</span> 大三在读</div>
          <div className="resume-item"><span className="label">学校：</span> 北京大学</div>
          <div className="resume-item"><span className="label">专业：</span> 计算机科学与技术</div>
          <div className="resume-item"><span className="label">爱好：</span> 健身、看球、柔道</div>
          <div className="resume-item"><span className="label">技能：</span> C & C++、JavaScript</div>
          <div className="resume-item"><span className="label">Email：</span> jungtoohoon@gmail.com</div>
          <div className="resume-item"><span className="label">支持的球队：</span> 阿森纳</div>
        </div>
      </div>

      <hr className="divider" />
      <div className="resume-card">
        <h2 className="section-title">我的经历：</h2>
        <ul className="experience-list">
          <li><span className="exp-year">2018-2021</span>　烟台爱华双语学校</li>
          <li><span className="exp-year">2021-2022</span>　北京大学 信息科学技术学院 大一</li>
          <li><span className="exp-year">2022-2024</span>　休学，服兵役，服役于 Defense Security Agency (DSA)</li>
          <li><span className="exp-year">2024-至今</span>　继续学业，北京大学 信息科学技术学院</li>
        </ul>
      </div>

        <hr className="divider" />
      <div className="resume-card">
        <h2 className="section-title">我的兴趣：</h2>
        <p className="resume-paragraph">
          在大学二年级学习 ICS 课程时，我深入理解了计算机如何运行，尤其对操作系统在虚拟内存管理、进程调度等方面的设计与实现印象深刻。令我尤为感兴趣的是，操作系统为了更高效利用有限的物理内存，引入了内存虚拟化机制。通过内存虚拟化，系统不仅实现了对物理内存的高效抽象与分配，提升了系统的稳定性与扩展性，还带来了进程隔离、安全保护、内存共享、大地址空间支持，以及 Copy-On-Write 等多方面的优势。这让我对操作系统产生了浓厚兴趣，并立志未来投身于这一领域，为操作系统底层技术的发展贡献自己的一份力量。
        </p>
      </div>

      

      <Link to="/" className="btn">
        返回首页
      </Link>
    </div>
  )
}

export default Resume
