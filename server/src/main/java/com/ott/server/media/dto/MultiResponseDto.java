package com.ott.server.media.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MultiResponseDto<T> {
    private List<T> content;
    private int currentPage;
    private int totalPages;
}
