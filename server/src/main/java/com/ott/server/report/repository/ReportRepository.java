package com.ott.server.report.repository;

import com.ott.server.report.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report,Long>{
}
